# jsonrpc

## `@asyncswap/jsonrpc`

A minimal jsonrpc server and client library.

```sh
bun add @asyncswap/jsonrpc
```

## Usage

### RPC Server

```ts
import { JsonRpcServer } from "@asyncswap/jsonrpc";

const server = new JsonRpcServer()

server.register("add", ([a,b]: [number, number]) => a + b)
server.register("ping", () => "pong")

Bun.serve({
  port: 4444,
  async fetch(req) {
    if (req.method !== "POST") {
      return new Response("JSON-RPC only", { status: 405 })
    }
    const payload = await req.json();
    const response = await server.handle(payload);
    if (!response) {
      return new Response(null, { status: 204 })
    }
    return Response.json(response);
  }
})

console.log("JSON-RPC running on http://localhost:4444")
```

### RPC Client

```ts
import { initializeRpcClient } from "@asyncswap/jsonrpc";
const url = "http://localhost:4444";
const client = initializeRpcClient(url);
const result = await client.call(
  "ping",
  []
);
console.log(result)
```
