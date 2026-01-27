# @asyncswap/eth-types

A library for Etherum Clients JSON-RPC types.

## Installation

```sh
bun add @asyncswap/eth-types
```

## Quick Start

### Ethereum Client Types

- base - Hex, Address, Bytes32, Block, etc.
- block - Block, BlockTag etc.
- client - SyncingStatus, Syncing.
- debug - methods e.g debug_getRawHeader etc.
- execute - EthSimulatePayload etc.
- feeHistory - FeeHistoryResults etc.
- filter - Filter etc.
- methods - eth_chainId etc.
- receipt - Log, ReceiptInfo etc.
- state - AccountProof etc.
- transaction - GenericTransaction etc.
- withdraw - Withdrawal etc.

## References

- [ethereum/execution-apis](https://github.com/ethereum/execution-apis)

## Dependencies

- `@asyncswap/eth-rpc` - lib for ethereum execution client JSON-RPC 2.0 api.

## License

MIT
