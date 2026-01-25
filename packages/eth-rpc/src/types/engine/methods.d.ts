declare global {
	export type EngineMethodsSpec = {
		// identification
		engine_getClientVersionV1: {
			params: [ClientVersionV1];
			result: ClientVersionV1[];
		};
		// share methods
		eth_blockNumber: { params: []; result: Uint };
		eth_call: {
			params: [GenericTransaction, BlockNumberOrTagOrHash];
			result: Bytes;
		};
		eth_chainId: { params: []; result: Uint };
		eth_getCode: { params: [Address, BlockNumberOrTagOrHash]; result: Bytes };
		eth_getBlockByHash: { params: [Hash32, boolean]; result: NotFound | Block };
		eth_getBlockByNumber: {
			params: [BlockNumberOrTag, boolean];
			result: NotFound | Block;
		};
		eth_getLogs: { params: [Filter]; result: FilterResults };
		eth_sendRawTransaction: { params: [Bytes]; result: Hash32 };
		eth_syncing: { params: []; result: SyncingStatus };
		// engine/blob
		engine_getBlobsV1: { params: [Hash32[]]; result: BlobAndProofV1[] };
		engine_getBlobsV2: { params: [Hash32[]]; result: BlobAndProofV2[] };
		engine_getBlobsV3: {
			params: [Hash32[]];
			result: Array<BlobAndProofV2[] | null> | null;
		};
		// engine/capabilities
		engine_exchangeCapabilities: { params: [string[]]; result: string[] };
		// engine/forkchoice
		engine_forkchoiceUpdatedV1: {
			params: [ForkchoiceStateV1, PayloadAttributesV1];
			result: ForkchoiceUpdatedResponseV1;
		};
		engine_forkchoiceUpdatedV2: {
			params: [ForkchoiceStateV1, PayloadAttributesV2];
			result: ForkchoiceUpdatedResponseV1;
		};
		engine_forkchoiceUpdatedV3: {
			params: [ForkchoiceStateV1, PayloadAttributesV3];
			result: ForkchoiceUpdatedResponseV1;
		};
		// engine/payload
		engine_newPayloadV1: {
			params: [ExecutionPayloadV1];
			result: PayloadStatusV1;
		};
		engine_newPayloadV2: {
			params: [ExecutionPayloadV1 | ExecutionPayloadV2];
			result: PayloadStatusNoInvalidBlockHash;
		};
		engine_newPayloadV3: {
			params: [ExecutionPayloadV3, Hash32[], Hash32];
			result: PayloadStatusNoInvalidBlockHash;
		};
		engine_newPayloadV4: {
			params: [ExecutionPayloadV3, Hash32[], Hash32, Bytes[]];
			result: PayloadStatusNoInvalidBlockHash;
		};
		engine_getPayloadV1: { params: [Bytes8]; result: ExecutionPayloadV1 };
		engine_getPayloadV2: {
			params: [Bytes8];
			result: {
				executionPayload: ExecutionPayloadV1 | ExecutionPayloadV2;
				blockValue: Uint256;
			};
		};
		engine_getPayloadV3: {
			params: [Bytes8];
			result: {
				executionPayload: ExecutionPayloadV3;
				blockValue: Uint256;
				blobsBundle: BlobsBundleV1;
				shouldOverrideBuilder: boolean;
			};
		};
		engine_getPayloadV4: {
			params: [Bytes8];
			result: {
				executionPayload: ExecutionPayloadV3;
				blockValue: Uint256;
				blobsBundle: BlobsBundleV1;
				shouldOverrideBuilder: boolean;
				executionRequests: Bytes[];
			};
		};
		engine_getPayloadV5: {
			params: [Bytes8];
			result: {
				executionPayload: ExecutionPayloadV3;
				blockValue: Uint256;
				blobsBundle: BlobsBundleV2;
				shouldOverrideBuilder: boolean;
				executionRequests: Bytes[];
			};
		};
		engine_getPayloadBodiesByHashV1: {
			params: [Hash32[]];
			result: ExecutionPayloadBodyV1[];
		};
		engine_getPayloadBodiesByRangeV1: {
			params: [Uint64, Uint64];
			result: ExecutionPayloadBodyV1[];
		};
		engine_newPayloadV5: {
			params: [ExecutionPayloadV4, Hash32[], Hash32, Bytes[]];
			result: PayloadStatusNoInvalidBlockHash;
		};
		engine_getPayloadV6: {
			params: [Bytes8];
			result: {
				executionPayload: ExecutionPayloadV4;
				blockValue: Uint256;
				blobsBundle: BlobsBundleV2;
				shouldOverrideBuilder: boolean;
				executionRequests: Bytes[];
			};
		};
		// engine/transition-configuration
		engine_exchangeTransitionConfigurationV1: {
			params: [TransitionConfigurationV1];
			result: TransitionConfigurationV1;
		};
	};
}

export { };
