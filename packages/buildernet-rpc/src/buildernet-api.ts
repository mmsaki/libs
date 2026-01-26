import { BaseClient } from "@asyncswap/jsonrpc";

export class BuildernetClient extends BaseClient<BuildernetMethodsSpec> {
  constructor(url: string) {
    super(url);
  }
}

export type FlashbotsRpcMethods<
  T extends Record<string, { params: unknown[]; result: unknown }>,
> = {
    [M in keyof T]: (...params: T[M]["params"]) => Promise<T[M]["result"]>;
  };
export interface BuildernetClient
  extends FlashbotsRpcMethods<BuildernetMethodsSpec> { }
