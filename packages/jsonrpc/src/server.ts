import { JsonRpcErrorCode } from "./error";

type RpcParams = readonly unknown[] | undefined;

export type Handler<Params extends RpcParams, Result> = (
	params: Params,
) => Promise<Result>;

export class JsonRpcServer<MethodsSpec extends RpcSpecBase> {
	private methods = new Map<
		keyof MethodsSpec,
		Handler<MethodsSpec[keyof MethodsSpec]["params"], any>
	>();

	register<
		Method extends keyof MethodsSpec,
		Params extends MethodsSpec[Method]["params"],
		Result,
	>(method: Method, handler: Handler<Params, Result>) {
		this.methods.set(method, handler as any);
	}

	async handle<
		Method extends keyof MethodsSpec,
		Params extends MethodsSpec[Method]["params"],
		Result,
	>(
		raw: unknown,
	): Promise<
		| JsonRpcResponse<Result, JsonRpcErrorCode | number>
		| JsonRpcResponse<Result, JsonRpcErrorCode | number>[]
		| null
	> {
		// handle batch
		if (Array.isArray(raw)) {
			if (raw.length === 0) {
				return this.error(
					null,
					JsonRpcErrorCode.INVALID_REQUEST,
					"Invalid request",
				);
			}
			const responses = await Promise.all(raw.map((item) => this.handle(item)));
			const filtered = responses.filter(
				(r): r is JsonRpcResponse<Result, JsonRpcErrorCode | number> =>
					r !== null,
			);
			return filtered.length > 0 ? filtered : null;
		}

		// handle single response
		const req = raw as Partial<JsonRpcRequest<Method, Params>>;

		if (
			typeof req !== "object" ||
			req === null ||
			req.jsonrpc !== "2.0" ||
			typeof req.method !== "string"
		) {
			return this.error(
				null,
				JsonRpcErrorCode.INVALID_REQUEST,
				"Invalid request",
			);
		}

		const id =
			typeof (req as any)?.id === "string" ||
				typeof (req as any)?.id === "number" ||
				(req as any)?.id === null
				? (req as any).id
				: null;

		const handler = this.methods.get(req.method as Method);
		if (!handler) {
			return id === null
				? null
				: this.error(
					req.id,
					JsonRpcErrorCode.METHOD_NOT_FOUND,
					"Method not found",
				);
		}

		try {
			const result = await handler(req.params as Params);
			if (req.id === undefined) return null; // notification
			return {
				jsonrpc: "2.0",
				result,
				id: req.id,
			};
		} catch (err) {
			return this.error(
				req.id ?? null,
				JsonRpcErrorCode.INTERNAL_ERROR,
				"Internal error",
				err instanceof Error ? err.message : err,
			);
		}
	}

	private error<
		Method extends keyof MethodsSpec,
		Params extends MethodsSpec[Method]["params"],
		Result,
	>(
		id: JsonRpcRequest<Method, Params>["id"],
		code: JsonRpcErrorCode | number,
		message: string,
		data?: unknown,
	): JsonRpcResponse<Result, JsonRpcErrorCode | number> {
		return {
			jsonrpc: "2.0",
			error: { code, message, data },
			id: id ?? null,
		};
	}
}
