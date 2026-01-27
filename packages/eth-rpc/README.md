# eth-rpc

A comprehensive TypeScript client for Ethereum execution and engine APIs.

## Installation

```bash
bun add @asyncswap/eth-rpc
# Must install to resolve types
bun add -D @asyncswap/eth-types 
```

## Quick Start

### Execution API Client

```typescript
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

## References

- [ethereum/execution-apis](https://github.com/ethereum/execution-apis)

## Dependencies

- `@asyncswap/jsonrpc` - a minimal JSON-RPC 2.0 spec library.

## License

MIT
