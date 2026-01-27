import type {
	Address,
	Bytes,
	Bytes8,
	Bytes256,
	Hash32,
	Hex,
	Uint,
} from "./base";
import type { TransactionInfo } from "./transaction";
import type { Withdrawal } from "./withdraw";
// block.yaml
export type BlockTag = "earliest" | "finalized" | "safe" | "latest" | "pending";
export type BlockNumberOrTag = Hex | BlockTag;
export type BlockNumberOrTagOrHash = BlockNumberOrTag | Hex;
export interface Block {
	hash: Hash32;
	parentHash: Hash32;
	sha3Uncles: Hash32;
	miner: Address;
	stateRoot: Hash32;
	transactionsRoot: Hash32;
	receiptsRoot: Hash32;
	logsBloom: Bytes256;
	number: Uint;
	gasLimit: Uint;
	gasUsed: Uint;
	timestamp: Uint;
	extraData: Bytes;
	mixHash: Hash32;
	nonce: Bytes8;
	size: Uint;
	transactions: Hash32[] | TransactionInfo[];
	uncles: Hash32[];
	requestedHash?: Hash32;
	baseFeePerGas?: Uint;
	withdrawalsRoot?: Hash32;
	blobGasUsed?: Uint;
	excessBlobGas?: Uint;
	parentBeaconBlockRoot?: Hash32;
	withdrawals?: Withdrawal[];
	difficulty?: Uint;
}
export interface BadBlock {
	block: Block;
	hash: Hash32;
	rlp: Bytes;
}
