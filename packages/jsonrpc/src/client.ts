export class JsonRpcClient {
	private id = 0;

	constructor(
		private send: (
			req: JsonRpcRequest<unknown>,
		) => Promise<JsonRpcResponse<unknown, number>>,
	) { }

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

export function initializeRpcClient(
	url: string,
	jwtToken?: string,
	timeout: number = 5000,
): JsonRpcClient {
	const client = new JsonRpcClient(async (req: JsonRpcRequest<unknown>) => {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			};
			if (jwtToken) {
				headers["Authorization"] = `Bearer ${jwtToken}`;
			}
			const res = await fetch(url, {
				method: "POST",
				headers,
				body: JSON.stringify(req),
			});

			return (await res.json()) as JsonRpcResponse<unknown, number>;
		} catch (err) {
			clearTimeout(timeoutId);
			if (err instanceof Error && err.name === "AbortError") {
				throw new Error(`Req timeout after ${timeout}ms`);
			}
			throw err;
		}
	});
	return client;
}
