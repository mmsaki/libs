export type JsonRpcId = string | number | null

export interface JsonRpcRequest<Method> {
  jsonrpc: "2.0"
  method: Method
  params?: unknown[]
  id?: JsonRpcId
}

export interface JsonRpcSuccess<Result> {
  jsonrpc: "2.0"
  result: Result
  id: JsonRpcId
}

export interface JsonRpcErrorObject<ErrorCode> {
  code: ErrorCode
  message: string
  data?: unknown
}

export interface JsonRpcError<ErrorCode> {
  jsonrpc: "2.0"
  error: JsonRpcErrorObject<ErrorCode>
  id: JsonRpcId
}

export type JsonRpcResponse<Result, ErrorCode> = JsonRpcSuccess<Result> | JsonRpcError<ErrorCode>
