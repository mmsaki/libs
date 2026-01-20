# jsonrpc

## `@msaki/jsonrpc`

A minimal jsonrpc server and client library.

```sh
bun add @msaki/jsonrpc
```

## Usage

### RPC Server

```ts
import { JsonRpcServer } from "@msaki/jsonrpc";

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

console.log("JSON-RPC sever on http://localhost:4444")
```

### RPC Client

```ts
import { initializeRpcClient } from "@msaki/jsonrpc";
const url = "http://localhost:4444";
const client = initializeRpcClient(url);
const result = client.call(
  "rpc_method",
  [1, 2]
);
```

Or

```ts
import { JsonRpcClient } from "@msaki/jsonrpc";
import type {
  JsonRpcRequest,
  JsonRpcResponse
} from "@msaki/jsonrpc";

const url = "http://localhost:4444";

const client = new JsonRpcClient(async (req: JsonRpcRequest<unknown>) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req)
  });

  return (await res.json()) as JsonRpcResponse<unknown, number>
});
const result = client.call(
  "rpc_method",
  [1, 2]
);
```
