import {type Handler} from "@netlify/functions";
import {API} from "osu-api-v2-js";

const handler: Handler = async () => {
  const [token, expiration] = [process.env["OSU_TOKEN"], process.env["OSU_TOKEN_EXPIRATION"]];
  let expired = false;

  if (expiration) {
    try {
      expired = new Date(expiration) < new Date();
    } catch {
      expired = true;
    }
  } else {
    expired = true;
  }

  if (!token || expired) {
    console.log("Setting a new token for osu!...");
    const api = await API.createAsync({id: 11451, secret: process.env.API_OSU!});
    process.env["OSU_TOKEN"] = api.access_token;
    process.env["OSU_TOKEN_EXPIRATION"] = api.expires.toISOString();
    console.log("Successfully set a new token for osu!");
  }

  return {
    statusCode: 200,
  };
};

export {handler};
