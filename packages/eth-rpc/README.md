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
console.log("Balance:", balance);
eth.eth_getTransactionCount("0x34", "safe");

import { EngineExecutionClient } from '@asyncswap/eth-rpc';

const engineUrl = 'https://localhost:8551';
const engine = new EngineExecutionClient(engineUrl, process.env.JWT_TOKEN!);
const payload = engine.engine_getPayloadV1("0x1");

console.log(payload);

import { EthFlashbotsClient } from '@asyncswap/eth-rpc';

const rpc = 'https://relay.flashbots.net';
const client = new EthFlashbotsClient(rpc);
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

### Builtin flashbots MEV rpc methods

- [x] eth_sendBundle
- [x] mev_sendBundle
- [x] eth_callBundle
- [x] eth_cancelBundle
- [x] mev_simBundle
- [x] eth_sendPrivateTransaction
- [x] eth_sendPrivateRawTransaction
- [x] eth_cancelPrivateTransaction
- [x] flashbots_getFeeRefundTotalsByRecipient
- [x] flashbots_getFeeRefundsByRecipient
- [x] flashbots_getFeeRefundsByBundle
- [x] flashbots_getFeeRefundsByBlock
- [x] flashbots_setFeeRefundRecipient
- [x] buildernet_getDelayedRefunds
- [x] buildernet_getDelayedRefundTotalsByRecipient
- [x] flashbots_getMevRefundTotalByRecipient
- [x] flashbots_getMevRefundTotalBySender

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
