declare global {
	export type RpcSpecBase = Record<
		string,
		{ params: readonly unknown[]; result: unknown }
	>;

	export interface JsonRpcRequest<Method, Params extends readonly unknown[]> {
		jsonrpc: "2.0";
		method: Method;
		params?: Params;
		id?: JsonRpcId;
	}
}

export { };
