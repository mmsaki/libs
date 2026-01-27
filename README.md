# Ethereum Client Libs

Typescript libraries for Ethereum client JSON-RPC api specs.

- [`@asyncswap/jsonrpc`](./packages/jsonrpc)
- [`@asyncswap/eth-types`](./packages/eth-types)
- [`@asyncswap/eth-rpc`](./packages/eth-rpc)
- [`@asyncswap/engine-rpc`](./packages/engine-rpc)
- [`@asyncswap/flashbots-rpc`](./packages/flashbots-rpc)
- [`@asyncswap/buildernet-rpc`](./packages/buildernet-rpc)

## Installation

Each package is self contained depending on your needs.

```sh
bun add @asyncswap/jsonrpc
bun add @asyncswap/eth-rpc
bun add @asyncswap/engine-rpc
bun add @asyncswap/flashbots-rpc
bun add @asyncswap/buildernet-rpc
bun add -D @asyncswap/eth-types
```

## Usage

See [/packages](./packages)

## Development

### Semver Package Versioning

Auto-update semver versioning for major, minor or patches.

```sh
bun changeset
```

Apply version changes

```sh
bun changeset version
```

> This will bump all the versions automatically and auto-update dependencies.

### Pusblish

Run

```sh
bun publish:jsonrpc
```
