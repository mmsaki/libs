import { JsonRpcServer } from "./src";

const server = new JsonRpcServer();

server.register("eth_add", async ([a, b]: [number, number]) => a + b);
server.register("eth_ping", async () => "pong");

Bun.serve({
	port: 4444,
	async fetch(req) {
		if (req.method !== "POST") {
			return new Response("JSON-RPC only", { status: 405 });
		}
		const payload = await req.json();
		const response = await server.handle(payload);
		if (!response) {
			return new Response(null, { status: 204 });
		}
		return Response.json(response);
	},
});

console.log("JSON-RPC running on http://localhost:4444");

import { JsonRpcClient } from "./src";

const url = "http://localhost:4444";
const client = new JsonRpcClient(url);
const result = await client.call(client.buildRequest("eth_ping", []));
console.log(result); // pong

const response = await server.handle({
	jsonrpc: "2.0",
	method: "eth_add",
	params: [2, 3],
	id: 1,
});

console.log(response); // { jsonrpc: '2.0', result: 5, id: 1 }
