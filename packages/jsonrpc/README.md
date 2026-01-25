# jsonrpc

A minimal JSON-RPC 2.0 server and client library.

## Installation

```bash
bun add @asyncswap/jsonrpc
```

## Quick Start

### Server

```typescript
import { JsonRpcServer } from '@asyncswap/jsonrpc';

const server = new JsonRpcServer();

// Register methods
server.register('add', ([a, b]: [number, number]) => a + b);
server.register('ping', () => 'pong');

// Handle requests
const response = await server.handle({
  jsonrpc: '2.0',
  method: 'add',
  params: [2, 3],
  id: 1
});

console.log(response); // { jsonrpc: '2.0', result: 5, id: 1 }
```

### Client

```typescript
import { JsonRpcClient } from '@asyncswap/jsonrpc';

const client = new JsonRpcClient('http://localhost:4444');

// Make a call
const result = await client.call('add', [2, 3]);
console.log(result); // 5

// Send a notification (no response expected)
await client.notify('log', ['Hello world']);
```

## API Reference

### JsonRpcServer

#### Methods

- `register<Method, Params, Result>(method: Method, handler: Handler<Params, Result>)` - Register a method handler
- `handle(request: any)` - Process a JSON-RPC request

***Types***:

- `type Handler<Params, Result> = (params: Params) => Promise<Result>` - type of rpc function dispatched on the server.
- `type JsonRpcResponse<Result, ErrorCode> =
  | JsonRpcSuccess<Result>
  | JsonRpcError<ErrorCode>;` - JSON-RPC response type returns either a result or error.

#### Error Codes

```typescript
enum JsonRpcErrorCodes {
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602,
  INTERNAL_ERROR = -32603,
  PARSE_ERROR = -32700,
  REQUEST_ABORTED = -32800,
  REQUEST_FAILED = -32801,
}
```

### JsonRpcClient

#### Constructor

- `new JsonRpcClient(url: string)` - Create a client instance

#### Methods

- `call(request, headers?)` - Make a JSON-RPC call
- `notify(method: Method, params?)` - Send a JSON-RPC notification
- `buildRequest(method, params?)` - Build a JSON-RPC request object

## Examples

```typescript
// Server example
import { JsonRpcServer } from '@asyncswap/jsonrpc';

const server = new JsonRpcServer();
server.register('add', ([a, b]: [number, number]) => a + b);

Bun.serve({
  port: 4444,
  async fetch(req) {
    const payload = await req.json();
    const response = await server.handle(payload);
    return Response.json(response);
  },
});
```

```typescript
// Client example
import { JsonRpcClient } from '@asyncswap/jsonrpc';

const client = new JsonRpcClient('http://localhost:4444');
const result = await client.call('add', [2, 3]);
console.log(result); // 5
```

## License

MIT
