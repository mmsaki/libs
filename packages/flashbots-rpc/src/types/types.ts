import type { Address, Hash32, Hex, Log, Uint } from "@asyncswap/eth-types";

export type GetDelayedRefundTotalsByRecipientParams = {
	recipient: Address;
	blockRangeFrom?: Hex;
	blockRangeTo?: Hex;
};
export type GetDelayedRefundTotalsByRecipientResult = {
	pending: Hex;
	received: Hex;
	indexedUpTo: Hex;
};

export type GetDelayedRefundsParams = {
	recipient: Address;
	blockRangeFrom?: Hex;
	blockRangeTo?: Hex;
	cursor?: Hex;
	hash?: Hash32;
};
export type GetDelayedRefundsResult = {
	refunds: Refund[];
	nextCursor: Hex;
	indexedUpTo: Hex;
};
export type GetFeeRefundsByBlockParams = {
	blockNumber: Hex;
};
export type GetFeeRefundsByBlockResult = unknown;
export type GetFeeRefundsByBundleParams = {
	bundleHash: Hex;
};
export type GetFeeRefundsByBundleResult = unknown;
export type GetFeeRefundsByRecipientParams = {
	recipient: Address;
	cursor?: Hex;
};
export type Refund = {
	hash: Hex;
	amount: Hex;
	blockNumber: Hex;
	status: "pending" | "received";
	recipient: Address;
};
export type GetFeeRefundsByRecipientResult = {
	refunds: Refund[];
	cursor: string;
};
export type GetFeeRefundTotalsByRecipientParams = {
	recipient: Address;
};
export type GetFeeRefundTotalsByRecipientResult = {
	pending: Hex;
	received: Hex;
	maxBlockNumber: Hex;
};
export type EthCancelPrivateTransactioParams = {
	txHash: Hex;
};
export type EthCancelPrivateTransactionResult = boolean;

export type EthSendPrivateRawTransactionParams = {
	// String, raw signed transaction
	tx: Hex;
	preferences?: {
		// Sends transactions to all registered block builders, sets MEV-Share revenue share to 50%
		fast: boolean;
		privacy?: {
			hints?: BundleHints;
			builders?: Builders[];
		};
		validity?: {
			refund?: Array<{ address: Address; percent: number }>;
		};
	};
};
export type EthSendPrivateRawTransactionResult = Hash32;

export type EthSendPrivateTransactionParams = {
	tx: Hex;
	maxBlockNumber: Hex;
	preferences?: {
		// Sends transactions to all registered block builders, sets MEV-Share revenue share to 50%
		fast: boolean;
		privacy?: {
			hints?: BundleHints;
			builders?: Builders[];
		};
		validity?: {
			refund?: Array<{ address: Address; percent: number }>;
		};
	};
};
export type EthSendPrivateTransactionResult = Hash32;
export type EthCancelBundleParams = {
	replacementUuid: string;
};
export type EthCancelBundleResult = unknown;

export type EthSendBundleParams = {
	txs: Hex[];
	blockNumber: Hex | "0x" | null; // 0x | null or missing field for next block only
	// Replacing: send bundle with same replacementUuid to override previous one
	// Canceling: send bundle with same replacementUuid and empty list of transactions to cancel
	replacementUuid?: string;
	revertingTxHashes?: Hex[];
	minBlockNumber?: Hex;
	maxBlockNumber?: Hex;
	minFlashblockNumber?: Hex;
	maxFlashblockNumber?: Hex;
	minTimestamp?: number;
	maxTimestamp?: number;
	builders?: Builders[];
};
export type EthCallBundleParams = {
	txs: Hex[];
	blockNumber: Hex;
	stateBlockNumber: string | "latest";
	timestamp: number;
};
export type MevSendBundleParams = {
	version: "v0.1";
	inclusion: Inclusion;
	body: BundleBody;
	validity?: BundleValidity;
	privacy?: BundlePrivacy;
};
export type MevSimBundleParams = {
	version: "beta-1";
	inclusion: Inclusion;
	body: BundleBody;
	validity: BundleValidity;
	privacy?: BundlePrivacy;
	metadata?: BundleMetadata;
	simOptions?: BundleSimOptions;
};
export type Inclusion = {
	block: string;
	maxBlock?: string;
};
export type BundleBody = Array<
	| { hash: string } // tx hash
	| { tx: string; canRevert: boolean } // signed tx
	| { bundle: MevSendBundleParams[] }
>;
export type BundleValidity = {
	refund?: Array<{ bodyIdx: number; percent: number }>;
	refundConfig?: Array<{ address: string; percent: number }>;
};
export type BundlePrivacy = {
	hints?: BundleHints[];
	builders?: Builders[];
};
export type BundleMetadata = { originId?: string };
export type BundleSimOptions = {
	parentBlock?: number | string; // Block used for simulation state. Defaults to latest block.
	blockNumber?: number; // default = parentBlock.number + 1
	coinbase?: string; // default = parentBlock.coinbase
	timestamp?: number; // default = parentBlock.timestamp + 12
	gasLimit?: number; // default = parentBlock.gasLimit
	baseFee?: bigint; // default = parentBlock.baseFeePerGas
	timeout?: number; // default = 5 (defined in seconds)
};
export type EthSendBundleResult = { bundleHash: Hex; smart: boolean };
export type MevSendBundleResult = { bundleHash: Hex };
export type BundleHints =
	| "calldata"
	| "contract_address"
	| "logs"
	| "function_selector"
	| "hash"
	| "tx_hash";

export type EthCallBundleResult = {
	bundleGasPrice: Uint;
	bundleHash: Hash32;
	coinbaseDiff: Uint;
	ethSentToCoinbase: Uint;
	gasFees: Uint;
	results: Array<{
		coinbaseDiff: Uint;
		ethSentToCoinbase: Uint;
		fromAddress: Address;
		gasFees: Uint;
		gasPrice: Uint;
		gasUsed: number;
		toAddress: Address;
		txHash: Hash32;
		value: Hex;
	}>;
	stateBlockNumber: number;
	totalGasUsed: number;
};
export type MevSimBundleResult = {
	success: boolean;
	error?: string;
	stateBlock: Hex;
	mevGasPrice: Hex;
	profit: Hex;
	refundableValue: Hex;
	gasUsed: Hex;
	logs?: Array<{
		txLogs?: Log[];
		bundleLogs?: MevSimBundleResult[];
	}>;
};
export type Builders =
	| "default"
	| "flashbots"
	| "f1b.io"
	| "rsync"
	| "beaverbuild.org"
	| "builder0x69"
	| "Titan"
	| "EigenPhi"
	| "boba-builder"
	| "Gambit"
	| "payload"
	| "Loki"
	| "BuildAI"
	| "JetBuilder"
	| "tbuilder"
	| "penguinbuild"
	| "bobthebuilder"
	| "BTCS"
	| "bloXroute"
	| "Blockbeelder"
	| "Quasar"
	| "Eureka";
