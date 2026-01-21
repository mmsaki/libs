# eth-rpc

## `@asyncswap/eth-rpc`

A complete library for ethereum rpc clients apis.

```sh
bun add @asyncswap/eth-rpc
```

## Usage

### Ethereum Execution Client Api

```ts
import { EthExecutionClient } from '@asyncswap/eth-rpc';

const url = 'http://localhost:8545'
const eth = new EthExecutionClient(url);

const balance = await eth.eth_getBalance(
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "latest"
);
console.log('Balance:', balance);
```

### Ethereum Engine Api

```ts
import { EngineExecutionClient } from "@asyncswap/eth-rpc";

const engineUrl = "https://localhost:8551";
const engine = new EngineExecutionClient(engineUrl, process.env.JWT_TOKEN!);
const payload = engine.engine_getPayloadV1("0x1");

console.log(payload);
```
