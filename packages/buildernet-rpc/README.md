# @asyncswap/buildernet-rpc

A TypeScript client for Flashbots buildernet JSON-RPC api.

## Installation

```sh
bun add @asyncswap/buildernet-rpc
# Must install to resolve types
bun add -D @asyncswap/eth-types 
```

## Quick Start

### Flashbots Client API

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

## References

- [Buildernet JSON-RPC API Spec](https://buildernet.org/docs/api)

## Dependencies

- `@asyncswap/jsonrpc` - a minimal JSON-RPC 2.0 lib.

## License

MIT
