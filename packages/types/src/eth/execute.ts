import type {
	Address,
	Bytes,
	Bytes32,
	Hash32,
	Uint,
	Uint64,
	Uint256,
} from "./base";
import type { Block } from "./block";
import type { Log } from "./receipt";
import type { AccessListEntry, AuthorizationList } from "./transaction";
import type { Withdrawal } from "./withdraw";
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
