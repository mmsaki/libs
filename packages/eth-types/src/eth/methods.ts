import type {
	Address,
	Addresses,
	Bytes,
	Bytes32,
	Bytes65,
	Hash32,
	NotFound,
	Uint,
	UintDecimal,
} from "./base";
import type { Block, BlockNumberOrTag, BlockNumberOrTagOrHash } from "./block";
import type { SyncingStatus } from "./client";
import type { DebugMethods } from "./debug";
import type { EthSimulatePayload, EthSimulateResult } from "./execute";
import type { AccessListResult, FeeHistoryResults } from "./feeHistory";
import type { Filter, FilterResults } from "./filter";
import type { ReceiptInfo } from "./receipt";
import type { AccountProof } from "./state";
import type { GenericTransaction, TransactionInfo } from "./transaction";
export type EthMethodsSpec = {
	eth_getTransactionByHash: {
		params: [Hash32];
		result: NotFound | TransactionInfo;
	};
	eth_getTransactionByBlockHashAndIndex: {
		params: [Hash32, Uint];
		result: NotFound | TransactionInfo;
	};
	eth_getTransactionReceipt: {
		params: [Hash32];
		result: NotFound | ReceiptInfo;
	};
	// eth/submit
	eth_sendTransaction: { params: [GenericTransaction]; result: Hash32 };
	eth_sendRawTransaction: { params: [Bytes]; result: Hash32 };
	// eth/state
	eth_getBalance: {
		params: [Address, BlockNumberOrTagOrHash];
		result: Uint;
	};
	eth_getStorageAt: {
		params: [Address, Bytes32, BlockNumberOrTagOrHash];
		result: Bytes;
	};
	eth_getTransactionCount: {
		params: [Address, BlockNumberOrTagOrHash];
		result: Uint;
	};
	eth_getCode: {
		params: [Address, BlockNumberOrTagOrHash];
		result: Bytes;
	};
	eth_getProof: {
		params: [Address, Bytes32[], BlockNumberOrTagOrHash];
		result: AccountProof;
	};
	// eth/sign
	eth_sign: { params: [Address, Bytes]; result: Bytes65 };
	eth_signTransaction: { params: [GenericTransaction]; result: Bytes };
	// eth/filter
	eth_newFilter: { params: [Filter]; result: Uint };
	eth_newBlockFilter: { params: []; result: Uint };
	eth_newPendingTransactionFilter: { params: []; result: Uint };
	eth_uninstallFilter: { params: []; result: Uint };
	eth_getFilterChanges: { params: []; result: FilterResults };
	eth_getFilterLogs: { params: [Uint]; result: FilterResults };
	eth_getLogs: { params: [Filter]; result: FilterResults };
	// eth/feeMarket
	eth_gasPrice: { params: []; result: Uint };
	eth_blobBaseFee: { params: []; result: Uint };
	eth_maxPriorityFeePerGas: { params: []; result: Uint };
	eth_feeHistory: {
		params: [Uint, BlockNumberOrTag, number[]];
		result: FeeHistoryResults;
	};
	// eth/execute
	eth_call: {
		params: [GenericTransaction, BlockNumberOrTagOrHash];
		result: Bytes;
	};
	eth_estimateGas: {
		params: [GenericTransaction, BlockNumberOrTag];
		result: Uint;
	};
	eth_createAccessList: {
		params: [GenericTransaction, BlockNumberOrTag];
		result: AccessListResult;
	};
	eth_simulateV1: {
		params: [EthSimulatePayload, BlockNumberOrTagOrHash];
		result: EthSimulateResult;
	};
	// eth/client
	eth_chainId: { params: []; result: Uint };
	eth_syncing: { params: []; result: SyncingStatus };
	eth_coinbase: { params: []; result: Address };
	eth_accounts: { params: []; result: Addresses };
	eth_blockNumber: { params: []; result: Uint };
	net_version: { params: []; result: UintDecimal };
	// eth/block
	eth_getBlockByHash: { params: [Hash32, boolean]; result: NotFound | Block };
	eth_getBlockByNumber: {
		params: [BlockNumberOrTag, boolean];
		result: NotFound | Block;
	};
	eth_getBlockTransactionCountByHash: {
		params: [Hash32];
		result: NotFound | Uint;
	};
	eth_getBlockTransactionCountByNumber: {
		params: [BlockNumberOrTag];
		result: NotFound | Uint;
	};
	eth_getUncleCountByBlockHash: { params: [Hash32]; result: NotFound | Uint };
	eth_getUncleCountByBlockNumber: {
		params: [BlockNumberOrTag];
		result: NotFound | Uint;
	};
	eth_getBlockReceipts: {
		params: [BlockNumberOrTagOrHash];
		result: NotFound | ReceiptInfo[];
	};
} & DebugMethods;
