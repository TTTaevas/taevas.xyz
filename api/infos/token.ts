import { addToken, createTables, db, getToken, removeExpiredTokens } from "../../database";
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

  await createTables(db);
  removeExpiredTokens(db);
  const token = await getToken(db, service);

  if (!token) {
    if (service === "osu") {
      const api = await API.createAsync(11451, process.env["API_OSU"]!);
      await addToken(db, {access_token: api.access_token, service: "osu", expires: api.expires});
    }

    if (service === "umami") {
      const response = await fetch("https://visitors.taevas.xyz/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${process.env["USERNAME_UMAMI"]}&password=${process.env["PASSWORD_UMAMI"]}`
      });
      const json: {token: string} = await response.json();
      await addToken(db, {access_token: json.token, service: "umami"});
    }
  }

  return new Response(null, {status: 200});
};
