import { ExecutionClient } from "./src";

const url = "http://localhost:8545";
const eth = new ExecutionClient(url);
const balance = await eth.eth_getBalance(
	"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
	"latest",
);
console.log("Balance:", balance);
eth.eth_getTransactionCount("0x34", "safe");

import { EngineExecutionClient } from "./src";

const engineUrl = "https://localhost:8551";
const engine = new EngineExecutionClient(engineUrl, process.env.JWT_TOKEN!);
const payload = await engine
	.setHeaders({
		Authorization: `Bearer <jwt-token>`,
	})
	.engine_getPayloadV1("0x1");

console.log(payload);

import { FlashbotsClient } from "./src";

const rpc = "https://relay.flashbots.net";
const client = new FlashbotsClient(rpc);
const bundle = {
	txs: ["0x123abc", "0x456def..."] as Hex[],

	blockNumber: "0xb63dcd" as Hex,
	minTimestamp: 0,
	maxTimestamp: 1615920932,
};
const body = client.rpc.buildRequest("eth_sendBundle", [bundle]);
// const signature = wallet.sign(body)
// const sender = wallet.address
client
	.setHeaders({
		"X-Flashbots-Signature": `0x<sender>:0x<signature>`,
	})
	.eth_sendBundle(bundle);
