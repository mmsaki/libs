declare global {
	export enum FlashbotsMethods {
		eth_sendBundle = "eth_sendBundle",
		mev_sendBundle = "mev_sendBundle",
		eth_callBundle = "eth_callBundle",
		eth_cancelBundle = "eth_cancelBundle",
		mev_simBundle = "mev_simBundle",
		eth_sendPrivateTransaction = "eth_sendPrivateTransaction",
		eth_sendPrivateRawTransaction = "eth_sendPrivateRawTransaction",
		eth_cancelPrivateTransaction = "eth_cancelPrivateTransaction",
		flashbots_getFeeRefundTotalsByRecipient = "flashbots_getFeeRefundTotalsByRecipient",
		flashbots_getFeeRefundsByRecipient = "flashbots_getFeeRefundsByRecipient",
		flashbots_getFeeRefundsByBundle = "flashbots_getFeeRefundsByBundle",
		flashbots_getFeeRefundsByBlock = "flashbots_getFeeRefundsByBlock",
		flashbots_setFeeRefundRecipient = "flashbots_setFeeRefundRecipient",
		buildernet_getDelayedRefunds = "buildernet_getDelayedRefunds",
		buildernet_getDelayedRefundTotalsByRecipient = "buildernet_getDelayedRefundTotalsByRecipient",
		flashbots_getMevRefundTotalByRecipient = "flashbots_getMevRefundTotalByRecipient",
		flashbots_getMevRefundTotalBySender = "flashbots_getMevRefundTotalBySender",
	}
}

export { };
