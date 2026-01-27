# @asyncswap/engine-rpc

A library for Ethereum engine api JSON-RPC spec.

## Installation

```
bun add @asyncswap/engine-rpc 
# Must install to resolve types
bun add -D @asyncswap/eth-types 
```

## Quick Start

### Engine API Client

```typescript
import { EngineClient } from "@asyncswap/engine-rpc";
import type { EngineRpc } from "@asyncswap/engine-rpc";

const engineUrl = "http://localhost:8551";
const engine = new EngineClient(engineUrl, process.env.JWT_TOKEN!) as EngineRpc;
const payload = await engine.eth_chainId();
console.log(payload);
```

## References

- [ethereum/execution-apis](https://github.com/ethereum/execution-apis/tree/main/src/engine)

## Dependencies

- `@asyncswap/jsonrpc` - a minimal JSON-RPC 2.0 spec library.

## License

MIT
