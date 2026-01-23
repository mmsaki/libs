import { EthExecutionClient } from "./eth-api";

export class MevBuilder extends EthExecutionClient {
	constructor(url: string) {
		super(url);
	}
	async eth_sendBundle(
		sendBundleParams: EthSendBundleParams,
	): Promise<EthSendBundleResult> {
		return await this.client.call(FlashbotsMethods.eth_sendBundle, [
			sendBundleParams,
		]);
	}
	async eth_callBundle(
		callBundleParams: EthCallBundleParams,
	): Promise<EthCallBundleResult> {
		return await this.client.call(FlashbotsMethods.eth_callBundle, [
			callBundleParams,
		]);
	}
	async mev_sendBundle(
		sendBundleParams: MevSendBundleParams,
	): Promise<MevSendBundleResult> {
		return await this.client.call(FlashbotsMethods.mev_sendBundle, [
			sendBundleParams,
		]);
	}
	async mev_simBundle(
		simBundleParams: MevSimBundleParams,
		parentBlock?: { parentBlock: Hash32 },
	): Promise<MevSimBundleResult> {
		return await this.client.call(FlashbotsMethods.mev_simBundle, [
			simBundleParams,
			parentBlock,
		]);
	}
	async eth_cancelBundle(
		cancelParams: EthCancelBundleParams,
	): Promise<EthCancelBundleResult> {
		return await this.client.call(FlashbotsMethods.eth_cancelBundle, [
			cancelParams,
		]);
	}
	async eth_sendPrivateTransaction(
		sendPrivateTransactionParams: EthSendPrivateTransactionParams,
	): Promise<EthSendPrivateTransactionResult> {
		return await this.client.call(FlashbotsMethods.eth_sendPrivateTransaction, [
			sendPrivateTransactionParams,
		]);
	}
	async eth_sendPrivateRawTransaction(
		sendPrivateRawTransactionParams: EthSendPrivateRawTransactionParams,
	): Promise<EthSendPrivateRawTransactionResult> {
		return await this.client.call(
			FlashbotsMethods.eth_sendPrivateRawTransaction,
			[sendPrivateRawTransactionParams],
		);
	}
	async eth_cancelPrivateTransaction(
		cancelPrivateTransactionParams: EthCancelPrivateTransactioParams,
	): Promise<EthCancelPrivateTransactionResult> {
		return await this.client.call(
			FlashbotsMethods.eth_cancelPrivateTransaction,
			[cancelPrivateTransactionParams],
		);
	}
	async flashbots_getFeeRefundTotalsByRecipient(
		params: GetFeeRefundTotalsByRecipientParams,
	): Promise<GetFeeRefundTotalsByRecipientResult> {
		return await this.client.call(
			FlashbotsMethods.flashbots_getFeeRefundTotalsByRecipient,
			[params],
		);
	}
	async flashbots_getFeeRefundsByRecipient(
		params: GetFeeRefundsByRecipientParams,
	): Promise<GetFeeRefundsByRecipientResult> {
		return await this.client.call(
			FlashbotsMethods.flashbots_getFeeRefundsByRecipient,
			[params],
		);
	}
	async flashbots_getFeeRefundsByBundle(
		params: GetFeeRefundsByBundleParams,
	): Promise<GetFeeRefundsByBundleResult> {
		return await this.client.call(
			FlashbotsMethods.flashbots_getFeeRefundsByBundle,
			[params],
		);
	}
	async flashbots_getFeeRefundsByBlock(
		params: GetFeeRefundsByBlockParams,
	): Promise<GetFeeRefundsByBlockResult> {
		return await this.client.call(
			FlashbotsMethods.flashbots_getFeeRefundsByBlock,
			[params],
		);
	}
	async flashbots_setFeeRefundRecipient(
		user: Address,
		delegate: Address,
	): Promise<{ from: Address; to: Address }> {
		return await this.client.call(
			FlashbotsMethods.flashbots_setFeeRefundRecipient,
			[user, delegate],
		);
	}
	async buildernet_getDelayedRefunds(
		params: GetDelayedRefundsParams,
	): Promise<GetDelayedRefundsResult> {
		return await this.client.call(
			FlashbotsMethods.buildernet_getDelayedRefunds,
			[params],
		);
	}
	async buildernet_getDelayedRefundTotalsByRecipient(
		params: GetDelayedRefundTotalsByRecipientParams,
	): Promise<GetDelayedRefundTotalsByRecipientResult> {
		return await this.client.call(
			FlashbotsMethods.buildernet_getDelayedRefundTotalsByRecipient,
			[params],
		);
	}
	async flashbots_getMevRefundTotalByRecipient(
		user: Address,
	): Promise<{ total: Hex }> {
		return await this.client.call(
			FlashbotsMethods.flashbots_getMevRefundTotalByRecipient,
			[user],
		);
	}
	async flashbots_getMevRefundTotalBySender(
		sender: Address,
	): Promise<{ total: Hex }> {
		return await this.client.call(
			FlashbotsMethods.flashbots_getMevRefundTotalBySender,
			[sender],
		);
	}
}
