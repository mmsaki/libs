// base.yaml
export type Hex = `0x${string}`;
export type Address = `0x${string}`;
export type Addresses = Address[];
export type Byte = Hex;
export type Bytes = Hex;
export type Bytes32 = Hex;
export type Bytes8 = Hex;
export type Bytes48 = Hex;
export type Bytes96 = Hex;
export type Bytes256 = Hex;
export type Bytes65 = Hex;
export type Ratio = number;
export type Uint = Hex;
export type Uint64 = Hex;
export type Uint256 = Hex;
export type UintDecimal = string; // e.g '1'
export type Hash32 = Hex;
export type NotFound = null;

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

// transaction.yaml
export interface AccessListEntry {
	address: Address;
	storageKeys: Hash32[];
}
export type TransactionUnsigned =
	| TransactionLegacyUnsigned
	| Transaction2930Unsigned
	| Transaction1559Unsigned
	| Transaction4844Unsigned
	| Transaction7702Unsigned;

export interface TransactionLegacyUnsigned {
	type: "0x0";
	nonce: Uint;
	to?: Address | null;
	gas: Uint;
	value: Uint;
	input: Bytes;
	gasPrice: Uint;
	chainId?: Uint;
}
export interface Transaction2930Unsigned {
	type: "0x1";
	nonce: Uint;
	to?: Address | null;
	gas: Uint;
	value: Uint;
	input: Bytes;
	gasPrice: Uint;
	chainId: Uint;
	accessList: AccessListEntry[];
}
export interface Transaction1559Unsigned {
	type: "0x2";
	nonce: Uint;
	to?: Address | null;
	gas: Uint;
	value: Uint;
	input: Bytes;
	gasPrice: Uint;
	maxFeePerGas: Uint;
	maxPriorityFeePerGas: Uint;
	accessList: AccessListEntry[];
	chainId: Uint;
}
export interface Transaction4844Unsigned {
	type: "0x3";
	nonce: Uint;
	to: Address;
	gas: Uint;
	value: Uint;
	input: Bytes;
	gasPrice?: Uint;
	maxFeePerGas: Uint;
	maxPriorityFeePerGas: Uint;
	maxFeePerBlobGas: Uint;
	accessList: AccessListEntry[];
	blobVersionedHashes: Hash32[];
	chainId: Uint;
}
export interface Transaction7702Unsigned {
	type: "0x4";
	nonce: Uint;
	to: Address;
	gas: Uint;
	value: Uint;
	input: Bytes;
	maxPriorityFeePerGas: Uint;
	maxFeePerGas: Uint;
	gasPrice?: Uint;
	accessList: AccessListEntry[];
	chainId: Uint;
	authorizationList: AuthorizationList;
}
export interface AuthorizationListEntry {
	chainId: Uint;
	nonce: Uint;
	address: Address;
	yParity: Byte;
	r: Uint256;
	s: Uint256;
}
export type AuthorizationList = AuthorizationListEntry[];

export type TransactionLegacySigned = {
	v: Byte;
	r: Uint;
	s: Uint;
} & TransactionLegacyUnsigned;
export type Transaction2930Signed = {
	yParity: Bytes;
	r: Uint;
	s: Uint;
	v?: Byte;
} & Transaction2930Unsigned;
export type Transaction1559Signed = {
	yParity: Bytes;
	r: Uint;
	s: Uint;
	v?: Byte;
} & Transaction1559Unsigned;
export type Transaction4844Signed = {
	yParity: Byte;
	r: Uint;
	s: Uint;
	v?: Byte;
} & Transaction4844Unsigned;
export type Transaction7702Signed = {
	yParity: Byte;
	r: Uint;
	s: Uint;
	v?: Byte;
} & Transaction7702Unsigned;
export type TransactionSigned =
	| TransactionLegacySigned
	| Transaction2930Signed
	| Transaction1559Signed
	| Transaction4844Signed
	| Transaction7702Signed;
export type TransactionInfo = {
	blockHash: Hash32;
	blockNumber: Uint;
	from: Address;
	hash: Hash32;
	transactionIndex: Uint;
} & TransactionSigned;
export interface GenericTransaction {
	type?: "0x0" | "0x1" | "0x2" | "0x3";
	to?: Address | null;
	from?: Address;
	value?: Uint;
	nonce?: Uint;
	gas?: Uint;
	input?: Bytes;
	gasPrice?: Uint;
	maxPriorityFeePerGas?: Uint;
	maxFeePerGas?: Uint;
	maxFeePerBlobGas?: Uint;
	accessList?: AccessListEntry[];
	blobVersionedHashes?: Hash32[];
	blobs?: Bytes[];
	chainId?: Uint;
	authorizationList?: AuthorizationList;
}

// withdrawal.yaml
export interface Withdrawal {
	index: Uint64;
	validatorIndex: Uint64;
	address: Address;
	amount: Uint256;
}

// state.yaml
export interface AccountProof {
	address: Address;
	accountProof: Bytes;
	balance: Uint256;
	codeHash: Hash32;
	nonce: Uint64;
	storageHash: Hash32;
	storageProof: StorageProof;
}
export interface StorageProof {
	key: Bytes32;
	value: Uint256;
	proof: Bytes;
}

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

// execute.yaml
export interface EthSimulatePayload {
	blockStateCalls: BlockStateCall[];
	traceTransfers?: boolean;
	validation?: boolean;
	returnFullTransactions?: boolean;
}
export interface BlockStateCall {
	blockOverrides?: BlockOverrides;
	stateOverrides?: StateOverrides;
	calls?: GenericCallTransaction[];
}
export interface BlockOverrides {
	number?: Uint64;
	prevRandao?: Uint256;
	time?: Uint64;
	gasLimit?: Uint64;
	feeRecipient?: Address;
	baseFeePerGas?: Uint256;
	withdrawals?: Withdrawal[];
	blobBaseFee?: Uint64;
}
export type StateOverrides = Record<Address, AccountOverride>;
export interface GenericCallTransaction {
	type?: "0x0" | "0x1" | "0x2" | "0x3";
	to?: Address | null;
	from?: Address;
	value?: Uint;
	nonce?: Uint;
	gas?: Uint;
	input?: Bytes;
	gasPrice?: Uint;
	maxPriorityFeePerGas?: Uint;
	maxFeePerGas?: Uint;
	maxFeePerBlobGas?: Uint;
	accessList?: AccessListEntry[];
	blobVersionedHashes?: Hash32[];
	authorizationList?: AuthorizationList;
}
export type AccountOverride = AccountOverrideState | AccountOverrideStateDiff;
export interface AccountOverrideState {
	state: AccountStorage;
	nonce?: Uint64;
	balance?: Uint256;
	code?: Bytes;
	movePrecompileToAddress?: Address;
}
export interface AccountOverrideStateDiff {
	stateDiff: AccountStorage;
	nonce?: Uint64;
	balance?: Uint256;
	code?: Bytes;
	movePrecompileToAddress?: Address;
}
export type AccountStorage = Record<Bytes32, Hash32>;
export type EthSimulateResult = EthSimulateBlockResultSingleSuccess[];

export type EthSimulateBlockResultSingleSuccess = {
	calls: CallResults;
} & Block;
export type CallResults = CallResultFailure | CallResultSuccess;
export interface CallResultFailure {
	status: "0x0";
	returnData: Bytes;
	gasUsed: Uint64;
	error: EXECUTION_REVERTED_ERROR | VM_EXECUTION_ERROR;
}
export type EXECUTION_REVERTED_ERROR = {
	code: -32000;
	message: "execution reverted.";
};
export type VM_EXECUTION_ERROR = {
	code: -32015;
	message: "vm execution error.";
};
export interface CallResultSuccess {
	status: "0x1";
	returnData: Bytes;
	gasUsed: Uint64;
	logs: Log[];
}

// client.yaml
export type SyncingStatus = Syncing | false;
export interface Syncing {
	startingBlock?: Uint;
	currentBlock?: Uint;
	highestBlock?: Uint;
}

// misc
export interface FeeHistoryResults {
	oldestBlock: Uint;
	baseFeePerGas: Uint[];
	baseFeePerBlobGas?: Uint[];
	gasUsedRatio: Ratio[];
	blobGasUsedRatio?: Ratio[];
	reward?: Uint[][];
}
export interface AccessListResult {
	accessList?: AccessListEntry[];
	error?: string;
	gasUsed?: Uint;
}
