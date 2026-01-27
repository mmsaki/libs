import type { Address, Addresses, Bytes32, Hash32, Uint } from "./base";
import type { Log } from "./receipt";
// filter.yaml
export type FilterResults = Hash32[] | Log[];
export type FilterTopic = Bytes32 | Bytes32[];
export type FilterTopics = FilterTopic | null;
export type Filter = FilterByBlockRange | FilterByBlockHash;
export interface FilterByBlockRange {
	fromBlock?: Uint;
	toBlock?: Uint;
	address?: null | Address | Addresses;
	topics?: FilterTopics;
}
export interface FilterByBlockHash {
	blockHash: Hash32;
	address?: Address | Addresses | null;
	topics?: FilterTopics;
}
