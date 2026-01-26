import { BaseClient } from "@asyncswap/jsonrpc";

export class ExecutionClient extends BaseClient<EthMethodsSpec> {
	constructor(url: string) {
		super(url);
	}
}

export type EthRpcMethods<
	MethodsSpec extends Record<
		string,
		{ params: readonly unknown[]; result: unknown }
	>,
> = {
		[Method in keyof MethodsSpec]: (
			...params: MethodsSpec[Method]["params"]
		) => Promise<MethodsSpec[Method]["result"]>;
	};

export interface ExecutionClient extends EthRpcMethods<EthMethodsSpec> { }
