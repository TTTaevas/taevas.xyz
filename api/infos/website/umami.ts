import type { Handler } from "../..";
import type { UmamiInfo } from "#Infos/Website/Umami.tsx";
import { db, getToken } from "../../../database.ts";

export const umami: Handler = async () => {
  const token = await getToken(db, "umami");
  const api_server = "https://visitors.taevas.xyz/api";
  const website_id = "f196d626-e609-4841-9a80-0dc60f523ed5";

  const now = new Date();
  const sevendaysago = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const response = await fetch(`${api_server}/websites/${website_id}/stats?startAt=${Number(sevendaysago)}&endAt=${Number(now)}`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token?.access_token}`
    },
  });

  // Not using the package directly because of serious issues I consider it to have
  const umami = await response.json() as UmamiInfo;
  if (!umami) {
    return new Response("Not Found", {status: 404});
  }

  return Response.json(umami, {status: 200});
};
