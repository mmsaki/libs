import type { Uint } from "./base";
// client.yaml
export type SyncingStatus = Syncing | false;
export interface Syncing {
	startingBlock?: Uint;
	currentBlock?: Uint;
	highestBlock?: Uint;
}
