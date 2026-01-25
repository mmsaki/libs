declare global {
	export type RpcMethodSpec = {
		params: readonly unknown[];
		result: unknown;
	};
	export type RpcSpecBase = Record<Method, RpcMethodSpec>;

	export interface JsonRpcRequest<Method, Params extends readonly unknown[]> {
		jsonrpc: "2.0";
		method: Method;
		params?: Params;
		id?: JsonRpcId;
	}
}

export { };
