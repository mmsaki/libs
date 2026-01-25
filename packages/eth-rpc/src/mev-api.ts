import { BaseClient } from "./base";

export class FlashbotsClient extends BaseClient<FlashbotsMethodsSpec> {
	constructor(url: string) {
		super(url);
	}

	// "X-Flashbots-Signature": `${sender}:${signature}`,
}

export type FlashbotsRpcMethods<
	T extends Record<string, { params: unknown[]; result: unknown }>,
> = {
		[M in keyof T]: (...params: T[M]["params"]) => Promise<T[M]["result"]>;
	};
export interface FlashbotsClient
	extends FlashbotsRpcMethods<FlashbotsMethodsSpec> { }
