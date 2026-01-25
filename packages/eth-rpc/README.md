# eth-rpc

A comprehensive TypeScript client for Ethereum execution and engine APIs.

## Installation

```bash
bun add @asyncswap/eth-rpc
```

## Quick Start

### Execution API Client

```typescript
import { ExecutionClient } from '@asyncswap/eth-rpc';

const url = 'http://localhost:8545'
const eth = new ExecutionClient(url);

const balance = await eth.eth_getBalance(
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "latest"
);
console.log("Balance:", balance);
eth.eth_getTransactionCount("0x34", "safe");
```

### Flashbots Client API

```ts
import { FlashbotsClient } from "@asyncswap/eth-rpc";

const rpc = "https://relay.flashbots.net";
const client = new FlashbotsClient(rpc);
```

### Engine API Client

```typescript
import { EngineExecutionClient } from '@asyncswap/eth-rpc';

const engineUrl = 'https://localhost:8551';
const engine = new EngineExecutionClient(engineUrl, process.env.JWT_TOKEN!);
const payload = await engine.engine_getPayloadV1("0x1");

console.log(payload);

import { FlashbotsClient } from '@asyncswap/eth-rpc';

const rpc = 'https://relay.flashbots.net';
const client = new FlashbotsClient(rpc);
```

## Error Handling

All methods return typed responses. Handle errors appropriately:

```typescript
try {
  const balance = await client.eth_getBalance(address, 'latest');
  console.log('Balance:', balance);
} catch (error) {
  console.error('RPC Error:', error);
}
```

## Type Safety

Full TypeScript support with comprehensive type definitions for all RPC methods and responses.

## Dependencies

- `@asyncswap/jsonrpc` - JSON-RPC 2.0 client/server implementation

## License

MIT
