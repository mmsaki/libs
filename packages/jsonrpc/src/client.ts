export class JsonRpcClient {
	private id = 0;

	constructor(private url: string) { }

	async call<Method = string, Result = unknown, E = unknown>(
		request: JsonRpcRequest<Method> | JsonRpcRequest<Method>[],
		headers?: Record<string, string>,
	): Promise<Result | Result[] | E> {
		const response = await this.request(request, headers);
		if ("error" in response) {
			return response.error as E;
		}
		if ("result" in response) {
			return response.result as Result;
		}
		if (Array.isArray(response)) {
			return response as Result[];
		} else {
			// what else can result be? maybe indefined
			return response;
		}
	}

	buildRequest<Method>(
		method: Method,
		params: unknown[] = [],
	): JsonRpcRequest<Method> {
		return {
			jsonrpc: "2.0" as const,
			method,
			params,
			id: ++this.id,
		};
	}

	private async request(
		req: JsonRpcRequest<unknown> | JsonRpcRequest<unknown>[],
		customHeaders?: Record<string, string>,
		timeout: number = 5000,
	): Promise<
		JsonRpcResponse<unknown, number> | JsonRpcResponse<unknown, number>[]
	> {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);
		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
				...(customHeaders ?? {}),
			};
			const res = await fetch(this.url, {
				method: "POST",
				headers,
				body: JSON.stringify(req),
				signal: controller.signal,
			});

			return (await res.json()) as
				| JsonRpcResponse<unknown, number>
				| JsonRpcResponse<unknown, number>[];
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") {
				return {
					jsonrpc: "2.0",
					error: {
						code: JsonRpcErrorCodes.REQUEST_ABORTED,
						message: `Request Aborted. Timeout after ${timeout}ms.`,
					},
					id: null,
				};
			}
			clearTimeout(timeoutId);
			return {
				jsonrpc: "2.0",
				error: {
					code: JsonRpcErrorCodes.REQUEST_FAILED,
					message: `Request failed: ${err}`,
				},
				id: null,
			};
		}
	}

	async notify<Method = string>(method: Method, params?: unknown[]) {
		const request: JsonRpcRequest<Method> = {
			jsonrpc: "2.0",
			method,
			params,
		};
		await fetch(this.url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(request),
		});
	}
}
