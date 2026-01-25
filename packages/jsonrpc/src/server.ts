import { JsonRpcErrorCode } from "./error";
export type Handler<Result> = (params: any) => any | Promise<Result>;

export class JsonRpcServer {
	private methods = new Map<string, Handler<any>>();

	register(method: string, handler: Handler<any>) {
		this.methods.set(method, handler);
	}

	async handle<Result, Method = string>(
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
		const req = raw as Partial<JsonRpcRequest<Method>>;

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

		const handler = this.methods.get(req.method);
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
			const result = await handler(req.params);
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

	private error<Result, Method = string>(
		id: JsonRpcRequest<Method>["id"],
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
