import { JsonRpcServer } from "@asyncswap/jsonrpc";

const rpc = new JsonRpcServer();

rpc.register("get_address", () => { });

const server = Bun.serve({
  port: 4444,
  fetch(req) {
    return Response.json({ message: "hello world!" });
  },
});

console.log(`Listening on ${server.url}`);
