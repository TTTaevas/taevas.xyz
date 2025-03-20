import { SQL } from "bun";
import {API} from "osu-api-v2-js";
import type { Handler } from "..";

const allowed_services = ["osu", "umami"];

export interface Token {
  access_token: string;
  expires: number;
  service: string;
}

export const token: Handler = async (params) => {
  const service = params.get("service");
  if (!service || !allowed_services.includes(service)) {
    return new Response("Bad Request", {status: 400});
  }

  const db = new SQL({
    username: "postgres"
  });
  await db.connect();
  await db.begin(sql => sql`
    CREATE TABLE IF NOT EXISTS tokens (
      access_token text,
      expires bigserial,
      service text
    )
  `);

  const tokens: Token[] = await db.begin(sql => sql`
    SELECT * FROM tokens
    WHERE service = ${service}
  `);

  const now = Number(new Date());
  const token = tokens.find((t) => t.expires > now);
  const expiredTokens = tokens.filter((t) => now > t.expires);

  const promises: Promise<void>[] = [];

  if (!token) {
    promises.push(new Promise(async (resolve, reject) => {
      console.log(`Setting a new token for ${service}...`);
      let new_tokens: Token[] = [];

      if (service === "osu") {
        const api = await API.createAsync(11451, process.env["API_OSU"]!);
        new_tokens = await db.begin(sql => sql`
          INSERT INTO tokens (access_token, expires, service)
          VALUES (${api.access_token}, ${Number(api.expires)}, ${service})
          RETURNING *
        `);
      }

      else if (service === "umami") {
        const response = await fetch("https://visitors.taevas.xyz/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `username=${process.env["USERNAME_UMAMI"]}&password=${process.env["PASSWORD_UMAMI"]}`
        });
        const json: {token: string} = await response.json();

        // Assume it expires in one day
        const date = new Date();
        date.setHours(date.getHours() + 24);
        new_tokens = await db.begin(sql => sql`
          INSERT INTO tokens (access_token, expires, service)
          VALUES (${json.token}, ${Number(date)}, ${service})
          RETURNING *
        `);
      }

      else {
        console.error(`Service "${service}" doesn't exist! Unable to set a new token...`);
        return reject();
      }

      new_tokens.forEach((token) => {
        console.log(`New ${service} token in the database, it'll expire on`, new Date(Number(token.expires)));
      });
      resolve();
    }));
  }

  if (expiredTokens.length) {
    promises.push(new Promise(async (resolve) => {
      console.log(`Deleting old tokens for ${service}...`);
      await Promise.all(expiredTokens.map(async (t) => {
        return new Promise<void>(async (resolve) => {
          await db.begin(sql => sql`
            DELETE FROM tokens
            WHERE access_token = ${t.access_token}
          `);
          console.log(`Old ${service} token that expired on`, new Date(Number(t.expires)), "has been deleted");
          resolve();
        });
      }));
      resolve();
    }));
  }

  await Promise.all(promises);

  return new Response(null, {status: 200});
};
