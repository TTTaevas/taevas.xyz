import { sql } from "bun";
import {type Handler} from "@netlify/functions";

import {API} from "osu-api-v2-js";

export interface Token {
  access_token: string;
  expires: number;
  service: string;
}

const allowed_services = ["osu", "umami"];

const handler: Handler = async (req) => {
  const service = req.queryStringParameters?.service;
  if (!service || !allowed_services.includes(service)) {return {statusCode: 400};}

  const tokens: Token[] = await sql`
    SELECT * FROM tokens
    WHERE service = ${service}
  `;

  const now = Number(new Date());
  const token = tokens.find((t) => t.expires > now);
  const expiredTokens = tokens.filter((t) => now > t.expires);

  const promises: Promise<void>[] = [];

  if (!token) {
    promises.push(new Promise(async (resolve, reject) => {
      console.log(`Setting a new token for ${service}...`);
      let new_token: Token | undefined;

      if (service === "osu") {
        const api = await API.createAsync(11451, process.env.API_OSU!);
        new_token = await sql`
          INSERT INTO tokens (access_token, expires, service)
          VALUES (${api.access_token}, ${Number(api.expires)}, ${service})
          RETURNING *
        `;
      }

      else if (service === "umami") {
        const response = await fetch("https://visitors.taevas.xyz/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `username=${process.env.USERNAME_UMAMI}&password=${process.env.PASSWORD_UMAMI}`
        });
        const json: {token: string} = await response.json();

        // Assume it expires in one day
        const date = new Date();
        date.setHours(date.getHours() + 24);
        new_token = await sql`
          INSERT INTO tokens (access_token, expires, service)
          VALUES (${json.token}, ${Number(date)}, ${service})
          RETURNING *
        `;
      }

      else {
        console.error(`Service "${service}" doesn't exist! Unable to set a new token...`);
        return reject();
      }

      if (new_token) {console.log(`New ${service} token in the database, it'll expire on:`, new Date(new_token.expires));}
      resolve();
    }));
  }

  if (expiredTokens.length) {
    promises.push(new Promise(async (resolve) => {
      console.log(`Deleting old tokens for ${service}...`);
      await Promise.all(expiredTokens.map(async (t) => {
        return new Promise<void>(async (resolve) => {
          await sql`
            DELETE FROM tokens
            WHERE access_token = ${t.access_token}
          `;
          console.log(`Old ${service} token that expired on:`, new Date(t.expires), "has been deleted");
          resolve();
        });
      }));
      resolve();
    }));
  }

  await Promise.all(promises);

  return {
    statusCode: 200,
  };
};

export {handler};