import { JsonRpcClient } from "./client";

export abstract class BaseClient<
	Spec extends Record<string, { params: unknown[]; result: unknown }>,
> {
	rpc: JsonRpcClient<Spec>;
	protected headers: Record<string, string> = {};

	constructor(url: string) {
		this.rpc = new JsonRpcClient(url);

		return new Proxy(this, {
			get: (target: this, prop: string | symbol, receiver) => {
				// let real properties / methods through
				if (prop in target) {
					const value = Reflect.get(target, prop, receiver);
					if (typeof value === "function") {
						return (...args: any[]) => {
							const result = value.apply(target, args);
							// if method returns target, return proxy instead
							return result === target ? receiver : result;
						};
					}
					return value;
				}
				// dynamic rpc
				if (typeof prop !== "string") return undefined;

				const method = prop as keyof Spec;

				return (
					...params: Spec[typeof method]["params"]
				): Spec[typeof method]["result"] =>
					this.rpc.call(this.rpc.buildRequest(method, params), this.headers);
			},
		});
	}

	withHeaders(headers: Record<string, string>) {
		this.headers = {
			...headers,
		};
		return this;
	}
}
