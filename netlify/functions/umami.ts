import { UmamiInfo } from "#Infos/Website/Umami.js";
import {type Handler} from "@netlify/functions";

const handler: Handler = async () => {
  const api_server = "https://api.umami.is/v1";
  const website_id = "3461d539-c2fb-4930-9d4a-a0e4016a174a";
  const now = new Date();
  const response = await fetch(`${api_server}/websites/${website_id}/stats?startAt=${Number(new Date("2025"))}&endAt=${Number(now)}`, {
    headers: {
      "Accept": "application/json",
      "x-umami-api-key": process.env.API_UMAMI!
    },
  });

  // From https://github.com/umami-software/api-client/blob/master/src/types.ts
  // Not using the package directly because of serious issues I consider it to have
  const umami = await response.json() as {
    pageviews: { value: number; prev: number };
    visitors: { value: number; prev: number };
    visits: { value: number; prev: number };
    bounces: { value: number; prev: number };
    totaltime: { value: number; prev: number };
  };

  if (!umami) {
    return {
      statusCode: 404,
    };
  }

  const info: UmamiInfo = {
    pageviews: umami.pageviews.value,
    visits: umami.visits.value,
    visitors: umami.visitors.value,
    totaltime: umami.totaltime.value
  };

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

export {handler};
