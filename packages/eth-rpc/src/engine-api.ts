import { BaseClient } from "./base";

export class EngineExecutionClient extends BaseClient<EngineMethodsSpec> {
	constructor(url: string, jwt_token: string) {
		super(url);
		this.headers = {
			Authorization: `Bearer ${jwt_token}`,
		};
	}
}

export type EngineRpcMethods<
	T extends Record<string, { params: unknown[]; result: unknown }>,
> = {
		[K in keyof T]: (...params: T[K]["params"]) => Promise<T[K]["result"]>;
	};

export interface EngineExecutionClient
	extends EngineRpcMethods<EngineMethodsSpec> { }
