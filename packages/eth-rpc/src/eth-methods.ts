import { initializeRpcClient, JsonRpcClient } from "@msaki/jsonrpc";

export type * as EthSchema from "./types";

import type { EthSchema } from ".";

export enum Methods {
	// eth/transaction
	eth_getTransactionByHash = "eth_getTransactionByHash",
	eth_getTransactionByBlockHashAndIndex = "eth_getTransactionByBlockHashAndIndex",
	eth_getTransactionReceipt = "eth_getTransactionReceipt",
	// eth/submit
	eth_sendTransaction = "eth_sendTransaction",
	eth_sendRawTransaction = "eth_sendRawTransaction",
	// eth/state
	eth_getBalance = "eth_getBalance",
	eth_getStorageAt = "eth_getStorageAt",
	eth_getTransactionCount = "eth_getTransactionCount",
	eth_getCode = "eth_getCode",
	eth_getProof = "eth_getProof",
	// eth/sign
	eth_sign = "eth_sign",
	eth_signTransaction = "eth_signTransaction",
	// eth/filter
	eth_newFilter = "eth_newFilter",
	eth_newBlockFilter = "eth_newBlockFilter",
	eth_newPendingTransactionFilter = "eth_newPendingTransactionFilter",
	eth_uninstallFilter = "eth_uninstallFilter",
	eth_getFilterChanges = "eth_getFilterChanges",
	eth_getFilterLogs = "eth_getFilterLogs",
	eth_getLogs = "eth_getLogs",
	// eth/feeMarket
	eth_gasPrice = "eth_gasPrice",
	eth_blobBaseFee = "eth_blobBaseFee",
	eth_maxPriorityFeePerGas = "eth_maxPriorityFeePerGas",
	eth_feeHistory = "eth_feeHistory",
	// eth/execute
	eth_call = "eth_call",
	eth_estimateGas = "eth_estimateGas",
	eth_createAccessList = "eth_createAccessList",
	eth_simulateV1 = "eth_simulateV1",
	// eth/client
	eth_chainId = "eth_chainId",
	eth_syncing = "eth_syncing",
	eth_coinbase = "eth_coinbase",
	eth_accounts = "eth_accounts",
	eth_blockNumber = "eth_blockNumber",
	net_version = "net_version",
}

export class EthExecutionClient {
	private client: JsonRpcClient;

	constructor(url: string) {
		this.client = initializeRpcClient(url);
	}

	// eth/transaction
	async eth_getTransactionByHash(
		transactioHash: EthSchema.Hash32,
	): Promise<EthSchema.NotFound | EthSchema.TransactionInfo> {
		return await this.client.call(Methods.eth_getTransactionByHash, [
			transactioHash,
		]);
	}
	async eth_getTransactionByBlockHashAndIndex(
		blockHash: EthSchema.Hash32,
		transactionIndex: EthSchema.Uint,
	): Promise<EthSchema.NotFound | EthSchema.TransactionInfo> {
		return await this.client.call(
			Methods.eth_getTransactionByBlockHashAndIndex,
			[blockHash, transactionIndex],
		);
	}
	async eth_getTransactionReceipt(
		transactionHash: EthSchema.Hash32,
	): Promise<EthSchema.NotFound | EthSchema.ReceiptInfo> {
		return await this.client.call(Methods.eth_getTransactionReceipt, [
			transactionHash,
		]);
	}

	// eth/submit
	async eth_sendTransaction(
		transaction: EthSchema.GenericTransaction,
	): Promise<EthSchema.Hash32> {
		return await this.client.call(Methods.eth_sendTransaction, [transaction]);
	}
	async eth_sendRawTransaction(
		transaction: EthSchema.Bytes,
	): Promise<EthSchema.Hash32> {
		return await this.client.call(Methods.eth_sendRawTransaction, [
			transaction,
		]);
	}
	// eth/state
	async eth_getBalance(
		address: EthSchema.Address,
		block: EthSchema.BlockNumberOrTagOrHash,
	): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_getBalance, [address, block]);
	}
	async eth_getStorageAt(
		address: EthSchema.Address,
		storageSlot: EthSchema.Bytes32,
		block: EthSchema.BlockNumberOrTagOrHash,
	): Promise<EthSchema.Bytes> {
		return await this.client.call(Methods.eth_getStorageAt, [
			address,
			storageSlot,
			block,
		]);
	}
	async eth_getTransactionCount(
		address: EthSchema.Address,
		block: EthSchema.BlockNumberOrTagOrHash,
	): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_getTransactionCount, [
			address,
			block,
		]);
	}
	async eth_getCode(
		address: EthSchema.Address,
		block: EthSchema.BlockNumberOrTagOrHash,
	): Promise<EthSchema.Bytes> {
		return await this.client.call(Methods.eth_getCode, [address, block]);
	}
	async eth_getProof(
		address: EthSchema.Address,
		storageKeys: EthSchema.Bytes32[],
		block: EthSchema.BlockNumberOrTagOrHash,
	): Promise<EthSchema.AccountProof> {
		return await this.client.call(Methods.eth_getProof, [
			address,
			storageKeys,
			block,
		]);
	}
	// eth/sign
	async eth_sign(
		address: EthSchema.Address,
		message: EthSchema.Bytes,
	): Promise<EthSchema.Bytes65> {
		return await this.client.call(Methods.eth_sign, [address, message]);
	}
	async eth_signTransaction(
		transaction: EthSchema.GenericTransaction,
	): Promise<EthSchema.Bytes> {
		return await this.client.call(Methods.eth_signTransaction, [transaction]);
	}
	// eth/filter
	async eth_newFilter(filter: EthSchema.Filter): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_newFilter, [filter]);
	}
	async eth_newBlockFilter(): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_newBlockFilter, []);
	}
	async eth_newPendingTransactionFilter(): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_newPendingTransactionFilter, []);
	}
	async eth_uninstallFilter(): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_uninstallFilter, []);
	}
	async eth_getFilterChanges(): Promise<EthSchema.FilterResults> {
		return await this.client.call(Methods.eth_getFilterChanges, []);
	}
	async eth_getFilterLogs(
		filterIdentifier: EthSchema.Uint,
	): Promise<EthSchema.FilterResults> {
		return await this.client.call(Methods.eth_getFilterLogs, [
			filterIdentifier,
		]);
	}
	async eth_getLogs(
		filter: EthSchema.Filter,
	): Promise<EthSchema.FilterResults> {
		return await this.client.call(Methods.eth_getLogs, [filter]);
	}
	// eth/feeMarket
	async eth_gasPrice(): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_gasPrice, []);
	}
	async eth_blobBaseFee(): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_blobBaseFee, []);
	}
	async eth_maxPriorityFeePerGas(): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_maxPriorityFeePerGas, []);
	}
	async eth_feeHistory(
		blockCount: EthSchema.Uint,
		newestBlock: EthSchema.BlockNumberOrTag,
		rewardPercentiles: number[],
	): Promise<EthSchema.FeeHistoryResults> {
		return await this.client.call(Methods.eth_feeHistory, [
			blockCount,
			newestBlock,
			rewardPercentiles,
		]);
	}
	// eth/execute
	async eth_call(
		transaction: EthSchema.GenericTransaction,
		block: EthSchema.BlockNumberOrTagOrHash,
	): Promise<EthSchema.Bytes> {
		return this.client.call(Methods.eth_call, [transaction, block]);
	}
	async eth_estimateGas(
		transaction: EthSchema.GenericTransaction,
		block: EthSchema.BlockNumberOrTag,
	): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_estimateGas, [
			transaction,
			block,
		]);
	}
	async eth_createAccessList(
		transaction: EthSchema.GenericTransaction,
		block: EthSchema.BlockNumberOrTag,
	): Promise<EthSchema.AccessListResult> {
		return await this.client.call(Methods.eth_createAccessList, [
			transaction,
			block,
		]);
	}
	async eth_simulateV1(
		payload: EthSchema.EthSimulatePayload,
		blockTag: EthSchema.BlockNumberOrTagOrHash,
	): Promise<EthSchema.EthSimulateResult> {
		return await this.client.call(Methods.eth_simulateV1, [payload, blockTag]);
	}
	// eth/client
	async eth_chainId(): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_chainId, []);
	}
	async eth_syncing(): Promise<EthSchema.SyncingStatus> {
		return await this.client.call(Methods.eth_syncing, []);
	}
	async eth_coinbase(): Promise<EthSchema.Address> {
		return await this.client.call(Methods.eth_coinbase, []);
	}
	async eth_accounts(): Promise<EthSchema.Addresses> {
		return await this.client.call(Methods.eth_accounts, []);
	}
	async eth_blockNumber(): Promise<EthSchema.Uint> {
		return await this.client.call(Methods.eth_blockNumber, []);
	}
	async net_version(): Promise<EthSchema.UintDecimal> {
		return await this.client.call(Methods.net_version, []);
	}
}
