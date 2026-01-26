import { BaseClient } from "@asyncswap/jsonrpc";

export class EngineExecutionClient extends BaseClient<EngineMethodsSpec> {
  constructor(url: string, jwt_token: string) {
    super(url);
    this.headers = {
      Authorization: `Bearer ${jwt_token}`,
    };
  }
}

export type EngineRpcMethods<
  MethodsSpec extends Record<
    string,
    { params: readonly unknown[]; result: unknown }
  >,
> = {
    [Method in keyof MethodsSpec]: (
      ...params: MethodsSpec[Method]["params"]
    ) => Promise<MethodsSpec[Method]["result"]>;
  };

export interface EngineExecutionClient
  extends EngineRpcMethods<EngineMethodsSpec> { }
