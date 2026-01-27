import type {
	Address,
	Byte,
	Bytes,
	Bytes32,
	Bytes256,
	Hash32,
	Uint,
} from "./base";
// receipt.yaml
export interface Log {
	transactionHash: Hash32;
	removed?: boolean;
	logIndex?: Uint;
	transactionIndex?: Uint;
	blockHash?: Hash32;
	blockNumber?: Uint;
	blockTimestamp?: Uint;
	address?: Address;
	data?: Bytes;
	topics?: Bytes32[];
}
export interface ReceiptInfo {
	type?: Byte;
	transactionHash: Hash32;
	transactionIndex: Uint;
	blockHash: Byte;
	blockNumber: Uint;
	from: Address;
	to?: Address | null;
	cumulativeGasUsed: Uint;
	gasUsed: Uint;
	blobGasUsed?: Uint;
	contractAddress?: Address | null;
	logs: Log[];
	logsBloom: Bytes256;
	root?: Hash32;
	status?: Uint;
	effectiveGasPrice: Uint;
	blobGasPrice?: Uint;
}
