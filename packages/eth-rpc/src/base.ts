import { JsonRpcClient } from "@asyncswap/jsonrpc";

export type RpcMethodSpec = {
	params: readonly unknown[];
	result: unknown;
};
export type RpcSpecBase = Record<string, RpcMethodSpec>;

export abstract class BaseClient<MethodsSpec extends RpcSpecBase> {
	rpc: JsonRpcClient<MethodsSpec>;
	protected headers: Record<string, string> = {};

	constructor(url: string) {
		this.rpc = new JsonRpcClient(url);

		return new Proxy(this, {
			get: (_: this, prop: string | symbol) => {
				if (typeof prop !== "string") return undefined;

				const method = prop as keyof MethodsSpec;

				return (...params: MethodsSpec[typeof method]["params"]) =>
					this.rpc.call(this.rpc.buildRequest(method, params), this.headers);
			},
		});
	}

	setHeaders(headers: Record<string, string>) {
		this.headers = {
			...headers,
		};
		return this;
	}
}
