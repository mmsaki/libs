import type { JsonRpcRequest, JsonRpcResponse } from "./types";

export class JsonRpcClient {
  private id = 0

  constructor(
    private send: (req: JsonRpcRequest<unknown>) => Promise<JsonRpcResponse<unknown, number>>
  ) {}

  async call<Method = string, Result = unknown, E = unknown>(method: Method, params?: unknown[]): Promise<Result | E> {
    const request: JsonRpcRequest<Method> = {
      jsonrpc: "2.0",
      method,
      params,
      id: ++this.id,
    }
    const response = await this.send(request);
    if ("error" in response) {
      return response.error as E
    }
    return response.result as Result
  }

  notify<Method = string>(method: Method, params?: unknown[]) {
    const request: JsonRpcRequest<Method> = {
      jsonrpc: "2.0",
      method,
      params
    }
    return this.send(request)
  }
}
