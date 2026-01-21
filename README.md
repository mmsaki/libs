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

### Client RPC Methods implemented

- [x] eth/transaction
  - [x] eth_getTransactionByHash
  - [x] eth_getTransactionByBlockHashAndIndex
  - [x] eth_getTransactionReceipt
- [x] eth/submit
  - [x] eth_sendTransaction
  - [x] eth_sendRawTransaction
- [x] eth/state
  - [x] eth_getBalance
  - [x] eth_getStorageAt
  - [x] eth_getTransactionCount
  - [x] eth_getCode
  - [x] eth_getProof
- [x] eth/sign
  - [x] eth_sign
  - [x] eth_signTransaction
- [x] eth/filter
  - [x] eth_newFilter
  - [x] eth_newBlockFilter
  - [x] eth_newPendingTransactionFilter
  - [x] eth_uninstallFilter
  - [x] eth_getFilterChanges
  - [x] eth_getFilterLogs
  - [x] eth_getLogs
- [x] eth/feeMarket
  - [x] eth_gasPrice
  - [x] eth_blobBaseFee
  - [x] eth_maxPriorityFeePerGas
  - [x] eth_feeHistory
- [x] eth/execute
  - [x] eth_call
  - [x] eth_estimateGas
  - [x] eth_createAccessList
  - [x] eth_simulateV1
- [x] eth/client
  - [x] eth_chainId
  - [x] eth_syncing
  - [x] eth_coinbase
  - [x] eth_accounts
  - [x] eth_blockNumber
  - [x] net_version
- [x] eth/block
  - [x] eth_getBlockByHash
  - [x] eth_getBlockByNumber
  - [x] eth_getBlockTransactionCountByHash
  - [x] eth_getBlockTransactionCountByNumber
  - [x] eth_getUncleCountByBlockHash
  - [x] eth_getUncleCountByBlockNumber
  - [x] eth_getBlockReceipts
- [x] debug
  - [x] debug_getRawHeader = "debug_getRawHeader",
  - [x] debug_getRawBlock = "debug_getRawBlock",
  - [x] debug_getRawTransaction = "debug_getRawTransaction",
  - [x] debug_getRawReceipts = "debug_getRawReceipts",
  - [x] debug_getBadBlocks = "debug_getBadBlocks",

### Ethereum Engine Api

```ts
import { EngineExecutionClient } from "@asyncswap/eth-rpc";

const engineUrl = "https://localhost:8551";
const engine = new EngineExecutionClient(engineUrl, process.env.JWT_TOKEN!);
const payload = engine.engine_getPayloadV1("0x1");

console.log(payload);
```

### Engine RPC Methods Implemented

- [x] engine/blob
  - [x] engine_getBlobsV1
  - [x] engine_getBlobsV2
  - [x] engine_getBlobsV3
- [x] engine/capabilities
  - [x] engine_exchangeCapabilities
- [x] engine/forkchoice
  - [x] engine_forkchoiceUpdatedV1
  - [x] engine_forkchoiceUpdatedV2
  - [x] engine_forkchoiceUpdatedV3
- [x] engine/payload
  - [x] engine_newPayloadV1
  - [x] engine_newPayloadV2
  - [x] engine_newPayloadV3
  - [x] engine_newPayloadV4
  - [x] engine_getPayloadV1
  - [x] engine_getPayloadV2
  - [x] engine_getPayloadV3
  - [x] engine_getPayloadV4
  - [x] engine_getPayloadV5
  - [x] engine_getPayloadBodiesByHashV1
  - [x] engine_getPayloadBodiesByRangeV1
  - [x] engine_newPayloadV5
  - [x] engine_getPayloadV6
- [x] engine/transition-configuration
  - [x] engine_exchangeTransitionConfigurationV1
