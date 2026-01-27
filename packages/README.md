# Eth Client Libs

## [`@asyncswap/jsonrpc`](./packages/jsonrpc)

A minimal jsonrpc spec implementation.

```sh
bun add @asyncswap/jsonrpc
```

### RPC Server

```ts
import { JsonRpcServer } from "@asyncswap/jsonrpc";

const server = new JsonRpcServer()

server.register("eth_add", async ([a,b]: [number, number]) => a + b)
server.register("eth_ping", async () => "pong")

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
import { JsonRpcClient } from "@asyncswap/jsonrpc";

const url = "http://localhost:4444";
const client = new JsonRpcClient(url);
const result = await client.call(client.buildRequest("eth_ping", []));
console.log(result);
```

## [`@asyncswap/eth-rpc`](./packages/eth-rpc)

A library for ethereum execution clients apis.

```sh
bun add @asyncswap/eth-rpc
```

### Execution Client Api

```ts
import { ExecutionClient } from "@asyncswap/eth-rpc";
import type { ExecutionClientRpc } from "@asyncswap/eth-rpc";

const url = "http://localhost:8545";
const eth = new ExecutionClient(url) as ExecutionClientRpc;
const balance = await eth.eth_getBalance(
 "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
 "latest",
);
console.log("Balance:", balance);
eth.eth_getTransactionCount("0x34", "safe");
```

## [`@asyncswap/engine-rpc`](./packages/engine-rpc)

A library for Ethereum engine api JSON-RPC spec.

### Engine Api

```ts
import { EngineClient } from "@asyncswap/engine-rpc";
import type { EngineRpc } from "@asyncswap/engine-rpc";

const engineUrl = "http://localhost:8551";
const engine = new EngineClient(engineUrl, process.env.JWT_TOKEN!) as EngineRpc;
const payload = await engine.eth_chainId();
console.log(payload);
```

## [`@asyncswap/flashbots-rpc`](./packages/flashbots-rpc)

A library for flashbots relay rpc.

### Flashbots Client API

```ts
import { FlashbotsClient } from "@asyncswap/flashbots-rpc";
import type { FlashbotsRpc, Hex } from "@asyncswap/flashbots-rpc";

const rpc = "https://relay.flashbots.net";
const client = new FlashbotsClient(rpc) as FlashbotsRpc;
const bundle = {
  txs: ["0x123abc", "0x456def..."] as Hex[],

  blockNumber: "0xb63dcd" as Hex,
  minTimestamp: 0,
  maxTimestamp: 1615920932,
};
const body = client.rpc.buildRequest("eth_sendBundle", [bundle]);
// const signature = wallet.sign(body)
// const sender = wallet.address
const result = await client
  .withHeaders({
    "X-Flashbots-Signature": `0x<sender>:0x<signature>`,
  })
  .eth_sendBundle(bundle);
console.log(result);
```

## [`@asyncswap/buildernet-rpc`](./packages/buildernet-rpc)

A library for flashbots buildernet JSON-RPC api.

### BuilderNet Client API

```ts
import { BuildernetClient } from "@asyncswap/buildernet-rpc";
import type { BuildernetRpc, Hex } from "@asyncswap/buildernet-rpc";

const rpc = "https://rpc.buildernet.org";
const client = new BuildernetClient(rpc) as BuildernetRpc;
const bundle = {
 txs: ["0x123abc", "0x456def..."] as Hex[],
 blockNumber: "0xb63dcd" as Hex,
 minTimestamp: 0,
 maxTimestamp: 1615920932,
};
const body = client.rpc.buildRequest("eth_sendBundle", [bundle]);
// const signature = wallet.sign(body)
// const sender = wallet.address
const result = await client
 .withHeaders({
  "X-Flashbots-Signature": `0x<sender>:0x<signature>`,
 })
 .eth_sendBundle(bundle);
console.log(result);
```

## Development

### Semver Package Versioning

To add semver versioning for major, minor or patches run

```sh
bun changeset
```

Apply versions

```sh
bun changeset version
```

> This will bump all the versions automatically and auto-update dependencies.

### Pusblish

Run

```sh
bun publish:jsonrpc && bun publish:eth-rpc
```
