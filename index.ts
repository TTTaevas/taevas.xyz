import type { Server } from "bun";
import { parseArgs } from "util";
import { coding_github } from "./api/coding_github";
import { coding_gitlab } from "./api/coding_gitlab";
import { coding_kitsudev } from "./api/coding_kitsudev";
import { fediverse_kitsuclub } from "./api/fediverse_kitsuclub";
import { gaming_osu } from "./api/gaming_osu";
import { gaming_speedruncom } from "./api/gaming_speedruncom";
import { hacking_hackthebox } from "./api/hacking_hackthebox";
import { japanese_wanikani } from "./api/japanese_wanikani";
import { media_anilist } from "./api/media_anilist";
import { media_lastfm } from "./api/media_lastfm";
import { token } from "./api/token";
import { website_umami } from "./api/website_umami";

// PORT AND SSL STUFF

const { values } = parseArgs({args: Bun.argv, allowPositionals: true, options: {dev: {type: "boolean"}}});
const dev = values.dev ?? false;
console.log("Are we in development mode?", dev);

const cert = Bun.file(process.env["SSL_CERT"] ?? "./cert.pem");
const key = Bun.file(process.env["SSL_KEY"] ?? "./key.pem");
const ssl_available = await cert.exists() && await key.exists();
console.log("Are we able to use SSL?", ssl_available);

// const port = dev ? 8000 : ssl_available ? 443 : 80;
const tls = ssl_available ? {cert, key} : undefined;
const ports: number[] = [dev ? 8000 : 80];
if (!dev && tls) ports.push(443);
console.log("Therefore, we are opening ports on:", ports);

// ACTUAL CODE

export type Handler = (req: URLSearchParams) => Promise<Response>;

const api_endpoints: Handler[] = [
  coding_github,
  coding_gitlab,
  coding_kitsudev,
  fediverse_kitsuclub,
  gaming_osu,
  gaming_speedruncom,
  hacking_hackthebox,
  japanese_wanikani,
  media_anilist,
  media_lastfm,
  token,
  website_umami
];

const builds = await Bun.build({
  entrypoints: ["./src/App.tsx", "index.css"],
  target: "browser",
  minify: {
    identifiers: true,
    syntax: true,
    whitespace: true,
  },
});

const servers: Server[] = ports.map((port) => Bun.serve({
  idleTimeout: 30,
  // @ts-expect-error https://github.com/oven-sh/bun/issues/17772
  tls: port !== 80 ? tls : undefined,
  port,
  fetch: async (req) => {
    const url = new URL(req.url);
    const parameters = url.searchParams;
    // merciless sanitization
    let pathname = url.pathname;
    pathname = pathname
      .replace(/([^A-Za-z0-9/.-_])/g, "")
      .replace(/(?<![a-zA-Z])\.(?![a-zA-Z])/g, "");

    if (req.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405 });
    }


    // MAIN PAGE

    if (pathname === "/") {
      const indexContent = await Bun.file("index.html").text();
      return new Response(indexContent, {headers: {"Content-Type": "text/html"}});
    }

    if (pathname === "/App.tsx" && req.method === "GET") {
      return new Response(builds.outputs[0].stream(), {
        headers: {
          "Content-Type": builds.outputs[0].type,
        },
      });
    };


    // EXTERNAL TO MAIN PAGE

    if (pathname === "/index.css" && req.method === "GET") {
      return new Response(builds.outputs[1].stream(), {
        headers: {
          "Content-Type": builds.outputs[1].type,
        },
      });
    };


    if (pathname.startsWith("/assets")) {
      const asset = Bun.file("." + pathname);
      return await asset.exists() ? new Response(asset, {status: 200}) : new Response("Not Found", {status: 404});
    }


    // API

    if (pathname.startsWith("/api")) {
      for (const endpoint of api_endpoints) {
        if (pathname === "/api/" + endpoint.name) {
          return await endpoint(parameters);
        }
      }
    }

    return new Response("Not Found", {status: 404});
  },
}));

servers.forEach((server) => console.log(`Listening on ${server.hostname}:${server.port}`));
console.log("\n\n--------\n\n");

