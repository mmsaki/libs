import { BaseClient } from "@asyncswap/jsonrpc";

export class BuildernetClient extends BaseClient<BuildernetMethodsSpec> {
  constructor(url: string) {
    super(url);
  }
}

export type FlashbotsRpcMethods<
  MethodsSpec extends Record<string, { params: unknown[]; result: unknown }>,
> = {
    [Method in keyof MethodsSpec]: (
      ...params: MethodsSpec[Method]["params"]
    ) => Promise<MethodsSpec[Method]["result"]>;
  };
export interface BuildernetClient
  extends FlashbotsRpcMethods<BuildernetMethodsSpec> { }
