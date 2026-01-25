# Ethereum Client Libs

## Core

### [`@asyncswap/jsonrpc`](./packages/jsonrpc)

A minimal jsonrpc spec implementation.

```sh
bun add @asyncswap/jsonrpc
```

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
const client = initializeRpcClient(url, process.env.JWT_TOKEN);
const result = await client.call(
  "ping",
  []
);
console.log(result)
```

### [`@asyncswap/eth-rpc`](./packages/eth-rpc)

A library for ethereum execution clients apis.

```sh
bun add @asyncswap/eth-rpc
```

### Execution Client Api

```ts
import { ExecutionClient } from '@asyncswap/eth-rpc';

const url = 'http://localhost:8545'
const eth = new ExecutionClient(url);

const balance = await eth.eth_getBalance(
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "latest"
);
console.log('Balance:', balance);
```

### Flashbots Client API

```ts
import { FlashbotsClient } from "@asyncswap/eth-rpc";

const rpc = "https://relay.flashbots.net";
const client = new FlashbotsClient(rpc);
```

### Engine Api

```ts
import { EngineExecutionClient } from "@asyncswap/eth-rpc";

const engineUrl = "https://localhost:8551";
const engine = new EngineExecutionClient(engineUrl, process.env.JWT_TOKEN!);
const payload = engine.engine_getPayloadV1("0x1");

console.log(payload);
```
