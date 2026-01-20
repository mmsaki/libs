import type { JsonRpcRequest, JsonRpcResponse } from "./types";

export class JsonRpcClient {
	private id = 0;

	constructor(
		private send: (
			req: JsonRpcRequest<unknown>,
		) => Promise<JsonRpcResponse<unknown, number>>,
	) {}

	async call<Method = string, Result = unknown, E = unknown>(
		method: Method,
		params?: unknown[],
	): Promise<Result | E> {
		const request: JsonRpcRequest<Method> = {
			jsonrpc: "2.0",
			method,
			params,
			id: ++this.id,
		};
		const response = await this.send(request);
		if ("error" in response) {
			return response.error as E;
		}
		return response.result as Result;
	}

	notify<Method = string>(method: Method, params?: unknown[]) {
		const request: JsonRpcRequest<Method> = {
			jsonrpc: "2.0",
			method,
			params,
		};
		return this.send(request);
	}
}

export function initializeRpcClient(url: string): JsonRpcClient {
	const client = new JsonRpcClient(async (req: JsonRpcRequest<unknown>) => {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(req),
		});

		return (await res.json()) as JsonRpcResponse<unknown, number>;
	});
	return client;
}
