import { EthExecutionClient } from "./src";

const url = "http://localhost:8545";
const eth = new EthExecutionClient(url);

const balance = await eth.eth_getBalance(
	"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
	"latest",
);
console.log("Balance:", balance);
eth.eth_getTransactionCount("0x34", "safe");

import { EngineExecutionClient } from "./src";

const engineUrl = "https://localhost:8551";
const engine = new EngineExecutionClient(engineUrl, process.env.JWT_TOKEN!);
const payload = engine.engine_getPayloadV1("0x1");

console.log(payload);

import { EthFlashbotsClient } from "./src";

const rpc = "https://relay.flashbots.net";
const fc = new EthFlashbotsClient(rpc);
