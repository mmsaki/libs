import type { Bytes, Hash32 } from "./base";
import type { BadBlock, BlockNumberOrTag } from "./block";

export type DebugMethods = {
	debug_getRawHeader: { params: [BlockNumberOrTag]; result: Bytes };
	debug_getRawBlock: { params: [BlockNumberOrTag]; result: Bytes };
	debug_getRawTransaction: { params: [Hash32]; result: Bytes };
	debug_getRawReceipts: { params: [BlockNumberOrTag]; result: Bytes[] };
	debug_getBadBlocks: { params: []; result: BadBlock[] };
};
