import type { Server } from "bun";
import { parseArgs } from "util";
import { api } from "./api";

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

const servers: Server[] = ports.map((port) => Bun.serve({
  idleTimeout: 30,
  tls: port !== 80 ? tls : undefined,
  port,
  fetch: async (req) => {
    try {
      const request_url = req.url.startsWith("/") ? "https://taevas.xyz".concat(req.url) : req.url;
      const url = new URL(request_url);
      const parameters = url.searchParams;
      // merciless sanitization
      let pathname = url.pathname;
      pathname = pathname
        .replace(/([^A-Za-z0-9/._-])/g, "")
        .replace(/(?<![a-zA-Z])\.(?![a-zA-Z])/g, "");

      if (req.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
      }


      // MAIN PAGE

      if (pathname === "/") {
        const indexContent = await Bun.file("./dist/index.html").text();
        return new Response(indexContent, {headers: {"Content-Type": "text/html"}});
      }

      // EXTERNAL TO MAIN PAGE

      if (pathname.startsWith("/compressed")) {
        const asset = Bun.file("./dist" + pathname);
        return await asset.exists() ? new Response(asset, {status: 200}) : new Response("Not Found", {status: 404});
      }

      if (pathname.startsWith("/assets")) {
        const asset = Bun.file("." + pathname);
        return await asset.exists() ? new Response(asset, {status: 200}) : new Response("Not Found", {status: 404});
      }


      // API

      if (pathname.startsWith("/api")) {
        return await api(pathname, parameters);
      }

      return new Response("Not Found", {status: 404});
    } catch(e) {
      console.error("Returning a 500 because:\n", e);
      return new Response("Internal Server Error", {status: 500});
    }
  },
}));

servers.forEach((server) => console.log(`Listening on ${server.hostname}:${server.port}`));
console.log("\n\n--------\n\n");
