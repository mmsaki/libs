import { BaseClient } from "@asyncswap/jsonrpc";

export class FlashbotsClient extends BaseClient<FlashbotsMethodsSpec> {
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
export interface FlashbotsClient
  extends FlashbotsRpcMethods<FlashbotsMethodsSpec> { }
