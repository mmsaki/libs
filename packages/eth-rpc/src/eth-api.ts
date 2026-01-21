import { initializeRpcClient, JsonRpcClient } from "@asyncswap/jsonrpc";

export class EthExecutionClient {
	private client: JsonRpcClient;

	constructor(url: string) {
		this.client = initializeRpcClient(url);
	}

	// eth/transaction
	async eth_getTransactionByHash(
		transactionHash: Hash32,
	): Promise<NotFound | TransactionInfo> {
		return await this.client.call(EthMethods.eth_getTransactionByHash, [
			transactionHash,
		]);
	}
	async eth_getTransactionByBlockHashAndIndex(
		blockHash: Hash32,
		transactionIndex: Uint,
	): Promise<NotFound | TransactionInfo> {
		return await this.client.call(
			EthMethods.eth_getTransactionByBlockHashAndIndex,
			[blockHash, transactionIndex],
		);
	}
	async eth_getTransactionReceipt(
		transactionHash: Hash32,
	): Promise<NotFound | ReceiptInfo> {
		return await this.client.call(EthMethods.eth_getTransactionReceipt, [
			transactionHash,
		]);
	}

	// eth/submit
	async eth_sendTransaction(transaction: GenericTransaction): Promise<Hash32> {
		return await this.client.call(EthMethods.eth_sendTransaction, [
			transaction,
		]);
	}
	async eth_sendRawTransaction(transaction: Bytes): Promise<Hash32> {
		return await this.client.call(EthMethods.eth_sendRawTransaction, [
			transaction,
		]);
	}
	// eth/state
	async eth_getBalance(
		address: Address,
		block: BlockNumberOrTagOrHash,
	): Promise<Uint> {
		return await this.client.call(EthMethods.eth_getBalance, [address, block]);
	}
	async eth_getStorageAt(
		address: Address,
		storageSlot: Bytes32,
		block: BlockNumberOrTagOrHash,
	): Promise<Bytes> {
		return await this.client.call(EthMethods.eth_getStorageAt, [
			address,
			storageSlot,
			block,
		]);
	}
	async eth_getTransactionCount(
		address: Address,
		block: BlockNumberOrTagOrHash,
	): Promise<Uint> {
		return await this.client.call(EthMethods.eth_getTransactionCount, [
			address,
			block,
		]);
	}
	async eth_getCode(
		address: Address,
		block: BlockNumberOrTagOrHash,
	): Promise<Bytes> {
		return await this.client.call(EthMethods.eth_getCode, [address, block]);
	}
	async eth_getProof(
		address: Address,
		storageKeys: Bytes32[],
		block: BlockNumberOrTagOrHash,
	): Promise<AccountProof> {
		return await this.client.call(EthMethods.eth_getProof, [
			address,
			storageKeys,
			block,
		]);
	}
	// eth/sign
	async eth_sign(address: Address, message: Bytes): Promise<Bytes65> {
		return await this.client.call(EthMethods.eth_sign, [address, message]);
	}
	async eth_signTransaction(transaction: GenericTransaction): Promise<Bytes> {
		return await this.client.call(EthMethods.eth_signTransaction, [
			transaction,
		]);
	}
	// eth/filter
	async eth_newFilter(filter: Filter): Promise<Uint> {
		return await this.client.call(EthMethods.eth_newFilter, [filter]);
	}
	async eth_newBlockFilter(): Promise<Uint> {
		return await this.client.call(EthMethods.eth_newBlockFilter, []);
	}
	async eth_newPendingTransactionFilter(): Promise<Uint> {
		return await this.client.call(
			EthMethods.eth_newPendingTransactionFilter,
			[],
		);
	}
	async eth_uninstallFilter(): Promise<Uint> {
		return await this.client.call(EthMethods.eth_uninstallFilter, []);
	}
	async eth_getFilterChanges(): Promise<FilterResults> {
		return await this.client.call(EthMethods.eth_getFilterChanges, []);
	}
	async eth_getFilterLogs(filterIdentifier: Uint): Promise<FilterResults> {
		return await this.client.call(EthMethods.eth_getFilterLogs, [
			filterIdentifier,
		]);
	}
	async eth_getLogs(filter: Filter): Promise<FilterResults> {
		return await this.client.call(EthMethods.eth_getLogs, [filter]);
	}
	// eth/feeMarket
	async eth_gasPrice(): Promise<Uint> {
		return await this.client.call(EthMethods.eth_gasPrice, []);
	}
	async eth_blobBaseFee(): Promise<Uint> {
		return await this.client.call(EthMethods.eth_blobBaseFee, []);
	}
	async eth_maxPriorityFeePerGas(): Promise<Uint> {
		return await this.client.call(EthMethods.eth_maxPriorityFeePerGas, []);
	}
	async eth_feeHistory(
		blockCount: Uint,
		newestBlock: BlockNumberOrTag,
		rewardPercentiles: number[],
	): Promise<FeeHistoryResults> {
		return await this.client.call(EthMethods.eth_feeHistory, [
			blockCount,
			newestBlock,
			rewardPercentiles,
		]);
	}
	// eth/execute
	async eth_call(
		transaction: GenericTransaction,
		block: BlockNumberOrTagOrHash,
	): Promise<Bytes> {
		return this.client.call(EthMethods.eth_call, [transaction, block]);
	}
	async eth_estimateGas(
		transaction: GenericTransaction,
		block: BlockNumberOrTag,
	): Promise<Uint> {
		return await this.client.call(EthMethods.eth_estimateGas, [
			transaction,
			block,
		]);
	}
	async eth_createAccessList(
		transaction: GenericTransaction,
		block: BlockNumberOrTag,
	): Promise<AccessListResult> {
		return await this.client.call(EthMethods.eth_createAccessList, [
			transaction,
			block,
		]);
	}
	async eth_simulateV1(
		payload: EthSimulatePayload,
		blockTag: BlockNumberOrTagOrHash,
	): Promise<EthSimulateResult> {
		return await this.client.call(EthMethods.eth_simulateV1, [
			payload,
			blockTag,
		]);
	}
	// eth/client
	async eth_chainId(): Promise<Uint> {
		return await this.client.call(EthMethods.eth_chainId, []);
	}
	async eth_syncing(): Promise<SyncingStatus> {
		return await this.client.call(EthMethods.eth_syncing, []);
	}
	async eth_coinbase(): Promise<Address> {
		return await this.client.call(EthMethods.eth_coinbase, []);
	}
	async eth_accounts(): Promise<Addresses> {
		return await this.client.call(EthMethods.eth_accounts, []);
	}
	async eth_blockNumber(): Promise<Uint> {
		return await this.client.call(EthMethods.eth_blockNumber, []);
	}
	async net_version(): Promise<UintDecimal> {
		return await this.client.call(EthMethods.net_version, []);
	}
	// eth/block
	async eth_getBlockByHash(
		blockHash: Hash32,
		hydratedTransactions: boolean,
	): Promise<NotFound | Block> {
		return await this.client.call(EthMethods.eth_getBlockByHash, [
			blockHash,
			hydratedTransactions,
		]);
	}
	async eth_getBlockByNumber(
		block: BlockNumberOrTag,
		hydratedTransactions: boolean,
	): Promise<NotFound | Block> {
		return await this.client.call(EthMethods.eth_getBlockByNumber, [
			block,
			hydratedTransactions,
		]);
	}
	async eth_getBlockTransactionCountByHash(
		blockHash: Hash32,
	): Promise<NotFound | Uint> {
		return await this.client.call(
			EthMethods.eth_getBlockTransactionCountByHash,
			[blockHash],
		);
	}
	async eth_getBlockTransactionCountByNumber(
		block: BlockNumberOrTag,
	): Promise<NotFound | Uint> {
		return await this.client.call(
			EthMethods.eth_getBlockTransactionCountByNumber,
			[block],
		);
	}
	async eth_getUncleCountByBlockHash(
		blockHash: Hash32,
	): Promise<NotFound | Uint> {
		return await this.client.call(EthMethods.eth_getUncleCountByBlockHash, [
			blockHash,
		]);
	}
	async eth_getUncleCountByBlockNumber(
		block: BlockNumberOrTag,
	): Promise<NotFound | Uint> {
		return await this.client.call(EthMethods.eth_getUncleCountByBlockNumber, [
			block,
		]);
	}
	async eth_getBlockReceipts(
		block: BlockNumberOrTagOrHash,
	): Promise<NotFound | ReceiptInfo[]> {
		return await this.client.call(EthMethods.eth_getBlockReceipts, [block]);
	}
	// debug_*
	async debug_getRawHeader(block: BlockNumberOrTag): Promise<Bytes> {
		// RPL-encoded header
		return await this.client.call(DebugMethods.debug_getRawHeader, [block]);
	}
	async debug_getRawBlock(block: BlockNumberOrTag): Promise<Bytes> {
		// RPL-encoded block
		return await this.client.call(DebugMethods.debug_getRawBlock, [block]);
	}
	async debug_getRawTransaction(transactionHash: Hash32): Promise<Bytes> {
		// EIP-2718 binary-encoded transactions
		return await this.client.call(DebugMethods.debug_getRawTransaction, [
			transactionHash,
		]);
	}
	async debug_getRawReceipts(block: BlockNumberOrTag): Promise<Bytes[]> {
		return await this.client.call(DebugMethods.debug_getRawReceipts, [block]);
	}
	async debug_getBadBlocks(): Promise<BadBlock[]> {
		return await this.client.call(DebugMethods.debug_getBadBlocks, []);
	}
}
