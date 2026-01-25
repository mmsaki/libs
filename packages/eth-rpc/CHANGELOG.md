# @asyncswap/eth-rpc

## 0.4.7

### Patch Changes

- ff4e035: fix base client proxy

  ```ts
  setHeaders(...) {
      this.headers = ...
      return this; // ❌ returns the *target*
  }
  ```

  The correct fix: return the receiver / proxy, not this

  You already have access to the proxy inside the get trap via receiver.

  So you must bind methods so that they return the proxy.

  - setHeaders() mutates the target
  - returns receiver (the proxy)
  - chaining continues in proxy-land
  - RPC methods remain visible

## 0.4.6

### Patch Changes

- 3d6ec6e: add clinet version spec

## 0.4.5

### Patch Changes

- 0d1be5d: upgrade with parameter typing
- Updated dependencies [882f94f]
  - @asyncswap/jsonrpc@0.4.7

## 0.4.4

### Patch Changes

- b2b631f: deprecated `EthExecutionClien` use `ExecutionClient`
- Updated dependencies [f7d28d9]
  - @asyncswap/jsonrpc@0.4.4

## 0.4.3

### Patch Changes

- 7ae86a0: new refactor on methods as data
- Updated dependencies [40a79dc]
  - @asyncswap/jsonrpc@0.4.3

## 0.4.2

### Patch Changes

- 9512db5: update documentation
- Updated dependencies [9512db5]
  - @asyncswap/jsonrpc@0.4.2

## 0.4.1

### Patch Changes

- 2598f09: updates docs

## 0.4.0

### Minor Changes

- fd79ea3: updates api for eth-client and adds flasbots methods and headers

### Patch Changes

- Updated dependencies [43de065]
- Updated dependencies [7e8300c]
- Updated dependencies [7126afa]
  - @asyncswap/jsonrpc@0.5.0

## 0.3.0

### Minor Changes

- d2562a2: implemented execution apis methods

  eth/transation

  - eth_getTransactionByHash
  - eth_getTransactionByBlockHashAndIndex
  - eth_getTransactionReceipt

  eth/submit

  - eth_sendTransaction
  - eth_sendRawTransaction

  eth/state

  - eth_getBalance
  - eth_getStorageAt
  - eth_getTransactionCount
  - eth_getCode
  - eth_getProof

  eth/sign

  - eth_sign
  - eth_signTransaction

  eth/filter

  - eth_newFilter
  - eth_newBlockFilter
  - eth_newPendingTransactionFilter
  - eth_uninstallFilter
  - eth_getFilterChanges
  - eth_getFilterLogs
  - eth_getLogs

- dc1718c: refactor of types dir to global types

### Patch Changes

- e3ac747: patch
- a9d1a29: add biome formatting
- Updated dependencies [dc1718c]
- Updated dependencies [e15733c]
- Updated dependencies [e3ac747]
- Updated dependencies [abddcdc]
- Updated dependencies [00ba692]
- Updated dependencies [07dc4e5]
- Updated dependencies [ded3e6b]
  - @asyncswap/jsonrpc@0.3.0
