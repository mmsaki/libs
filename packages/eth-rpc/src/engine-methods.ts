import { initializeRpcClient, JsonRpcClient } from "@msaki/jsonrpc";

export class EngineExecutionClient {
	private client: JsonRpcClient;

	constructor(url: string, jwt_token: string) {
		this.client = initializeRpcClient(url, jwt_token);
	}

	// eth/transaction
	async eth_sendRawTransaction(transaction: Bytes): Promise<Hash32> {
		return await this.client.call(EngineMethods.eth_sendRawTransaction, [
			transaction,
		]);
	}
	// eth/state
	async eth_getCode(
		address: Address,
		block: BlockNumberOrTagOrHash,
	): Promise<Bytes> {
		return await this.client.call(EngineMethods.eth_getCode, [address, block]);
	}
	async eth_getLogs(filter: Filter): Promise<FilterResults> {
		return await this.client.call(EngineMethods.eth_getLogs, [filter]);
	}
	// eth/execute
	async eth_call(
		transaction: GenericTransaction,
		block: BlockNumberOrTagOrHash,
	): Promise<Bytes> {
		return this.client.call(EngineMethods.eth_call, [transaction, block]);
	}
	// eth/client
	async eth_chainId(): Promise<Uint> {
		return await this.client.call(EngineMethods.eth_chainId, []);
	}
	async eth_syncing(): Promise<SyncingStatus> {
		return await this.client.call(EngineMethods.eth_syncing, []);
	}
	async eth_blockNumber(): Promise<Uint> {
		return await this.client.call(EngineMethods.eth_blockNumber, []);
	}
	// eth/block
	async eth_getBlockByHash(
		blockHash: Hash32,
		hydratedTransactions: boolean,
	): Promise<NotFound | Block> {
		return await this.client.call(EngineMethods.eth_getBlockByHash, [
			blockHash,
			hydratedTransactions,
		]);
	}
	async eth_getBlockByNumber(
		block: BlockNumberOrTag,
		hydratedTransactions: boolean,
	): Promise<NotFound | Block> {
		return await this.client.call(EngineMethods.eth_getBlockByNumber, [
			block,
			hydratedTransactions,
		]);
	}
	// engine/blob
	async engine_getBlobsV1(
		blobedVersionedHashes: Hash32[],
	): Promise<BlobAndProofV1[]> {
		return await this.client.call(EngineMethods.engine_getBlobsV1, [
			blobedVersionedHashes,
		]);
	}
	async engine_getBlobsV2(
		blobedVersionedHashes: Hash32[],
	): Promise<BlobAndProofV2[]> {
		return await this.client.call(EngineMethods.engine_getBlobsV2, [
			blobedVersionedHashes,
		]);
	}
	async engine_getBlobsV3(
		blobedVersionedHashes: Hash32[],
	): Promise<Array<BlobAndProofV2[] | null> | null> {
		return await this.client.call(EngineMethods.engine_getBlobsV2, [
			blobedVersionedHashes,
		]);
	}
	// engine/capabilities
	async engine_exchangeCapabilities(
		consensusClientMethods: string[],
	): Promise<string[]> {
		return await this.client.call(EngineMethods.engine_exchangeCapabilities, [
			consensusClientMethods,
		]);
	}
	// engine/forkchoice
	async engine_forkchoiceUpdatedV1(
		forkchoiceState: ForkchoiceStateV1,
		payloadAttribute: PayloadAttributesV1,
	): Promise<ForkchoiceUpdatedResponseV1> {
		return await this.client.call(EngineMethods.engine_forkchoiceUpdatedV1, [
			forkchoiceState,
			payloadAttribute,
		]);
	}
	async engine_forkchoiceUpdatedV2(
		forkchoiceState: ForkchoiceStateV1,
		payloadAttribute: PayloadAttributesV2,
	): Promise<ForkchoiceUpdatedResponseV1> {
		return await this.client.call(EngineMethods.engine_forkchoiceUpdatedV2, [
			forkchoiceState,
			payloadAttribute,
		]);
	}
	async engine_forkchoiceUpdatedV3(
		forkchoiceState: ForkchoiceStateV1,
		payloadAttribute: PayloadAttributesV3,
	): Promise<ForkchoiceUpdatedResponseV1> {
		return await this.client.call(EngineMethods.engine_forkchoiceUpdatedV3, [
			forkchoiceState,
			payloadAttribute,
		]);
	}
	// engine/payload
	async engine_newPayloadV1(
		executionPayload: ExecutionPayloadV1,
	): Promise<PayloadStatusV1> {
		return await this.client.call(EngineMethods.engine_newPayloadV1, [
			executionPayload,
		]);
	}
	async engine_newPayloadV2(
		executionPayload: ExecutionPayloadV1 | ExecutionPayloadV2,
	): Promise<PayloadStatusNoInvalidBlockHash> {
		return await this.client.call(EngineMethods.engine_newPayloadV2, [
			executionPayload,
		]);
	}
	async engine_newPayloadV3(
		executionPayload: ExecutionPayloadV3,
		expectedBlobVersionedHashes: Hash32[],
		rootOfTheParentBeaconBlock: Hash32,
	): Promise<PayloadStatusNoInvalidBlockHash> {
		return await this.client.call(EngineMethods.engine_newPayloadV3, [
			executionPayload,
			expectedBlobVersionedHashes,
			rootOfTheParentBeaconBlock,
		]);
	}
	async engine_newPayloadV4(
		executionPayload: ExecutionPayloadV3,
		expectedBlobVersionedHashes: Hash32[],
		rootOfTheParentBeaconBlock: Hash32,
		executionRequests: Bytes[],
	): Promise<PayloadStatusNoInvalidBlockHash> {
		return await this.client.call(EngineMethods.engine_newPayloadV4, [
			executionPayload,
			expectedBlobVersionedHashes,
			rootOfTheParentBeaconBlock,
			executionRequests,
		]);
	}
	async engine_getPayloadV1(payloadId: Bytes8): Promise<ExecutionPayloadV1> {
		return await this.client.call(EngineMethods.engine_getPayloadV1, [
			payloadId,
		]);
	}
	async engine_getPayloadV2(payloadId: Bytes8): Promise<{
		executionPayload: ExecutionPayloadV1 | ExecutionPayloadV2;
		blockValue: Uint256;
	}> {
		return await this.client.call(EngineMethods.engine_getPayloadV2, [
			payloadId,
		]);
	}
	async engine_getPayloadV3(payloadId: Bytes8): Promise<{
		executionPayload: ExecutionPayloadV3;
		blockValue: Uint256;
		blobsBundle: BlobsBundleV1;
		shouldOverrideBuilder: boolean;
	}> {
		return await this.client.call(EngineMethods.engine_getPayloadV3, [
			payloadId,
		]);
	}
	async engine_getPayloadV4(payloadId: Bytes8): Promise<{
		executionPayload: ExecutionPayloadV3;
		blockValue: Uint256;
		blobsBundle: BlobsBundleV1;
		shouldOverrideBuilder: boolean;
		executionRequests: Bytes[];
	}> {
		return await this.client.call(EngineMethods.engine_getPayloadV4, [
			payloadId,
		]);
	}
	async engine_getPayloadV5(payloadId: Bytes8): Promise<{
		executionPayload: ExecutionPayloadV3;
		blockValue: Uint256;
		blobsBundle: BlobsBundleV2;
		shouldOverrideBuilder: boolean;
		executionRequests: Bytes[];
	}> {
		return await this.client.call(EngineMethods.engine_getPayloadV5, [
			payloadId,
		]);
	}
	async engine_getPayloadBodiesByHashV1(
		arrayOfBlockHashes: Hash32[],
	): Promise<ExecutionPayloadBodyV1[]> {
		return await this.client.call(
			EngineMethods.engine_getPayloadBodiesByHashV1,
			[arrayOfBlockHashes],
		);
	}
	async engine_getPayloadBodiesByRangeV1(
		startingBlockNumber: Uint64,
		numberOfBlocksToReturn: Uint64,
	): Promise<ExecutionPayloadBodyV1[]> {
		return await this.client.call(
			EngineMethods.engine_getPayloadBodiesByRangeV1,
			[startingBlockNumber, numberOfBlocksToReturn],
		);
	}
	async engine_newPayloadV5(
		executionPayload: ExecutionPayloadV4,
		expectedBlobVersionedHashes: Hash32[],
		parentBeaconBlockRoot: Hash32,
		executionRequests: Bytes[],
	): Promise<PayloadStatusNoInvalidBlockHash> {
		return await this.client.call(EngineMethods.engine_newPayloadV5, [
			executionPayload,
			expectedBlobVersionedHashes,
			parentBeaconBlockRoot,
			executionRequests,
		]);
	}
	async engine_getPayloadV6(payloadId: Bytes8): Promise<{
		executionPayload: ExecutionPayloadV4;
		blockValue: Uint256;
		blobsBundle: BlobsBundleV2;
		shouldOverrideBuilder: boolean;
		executionRequests: Bytes[];
	}> {
		return await this.client.call(EngineMethods.engine_getPayloadV6, [
			payloadId,
		]);
	}
	// engine/transition-configuration
	async engine_exchangeTransitionConfigurationV1(
		consensusClientConfiguration: TransitionConfigurationV1,
	): Promise<TransitionConfigurationV1> {
		return await this.client.call(
			EngineMethods.engine_exchangeTransitionConfigurationV1,
			[consensusClientConfiguration],
		);
	}
}
