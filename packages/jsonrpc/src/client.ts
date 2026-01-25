import { JsonRpcErrorCode } from "./error";

export class JsonRpcClient<MethodsSpec extends RpcSpecBase> {
	private id = 0;

	constructor(private url: string) { }

	async call<Method extends keyof MethodsSpec, Result = unknown, E = unknown>(
		request:
			| JsonRpcRequest<Method, MethodsSpec[Method]["params"]>
			| JsonRpcRequest<Method, MethodsSpec[Method]["params"]>[],
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

	buildRequest<Method extends keyof MethodsSpec>(
		method: Method,
		params: MethodsSpec[Method]["params"],
	): JsonRpcRequest<Method, MethodsSpec[Method]["params"]> {
		return {
			jsonrpc: "2.0",
			method,
			params,
			id: ++this.id,
		};
	}

	private async request<Method extends keyof MethodsSpec>(
		req:
			| JsonRpcRequest<Method, MethodsSpec[Method]["params"]>
			| JsonRpcRequest<Method, MethodsSpec[Method]["params"]>[],
		customHeaders?: Record<string, string>,
	): Promise<
		JsonRpcResponse<unknown, number> | JsonRpcResponse<unknown, number>[]
	> {
		const controller = new AbortController();
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
			return {
				jsonrpc: "2.0",
				error: {
					code: JsonRpcErrorCode.REQUEST_FAILED,
					message: `Request failed: ${err}`,
				},
				id: null,
			};
		}
	}

	async notify<Method extends keyof MethodsSpec>(
		method: Method,
		params?: MethodsSpec[Method]["params"],
	) {
		const request: JsonRpcRequest<Method, MethodsSpec[Method]["params"]> = {
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
