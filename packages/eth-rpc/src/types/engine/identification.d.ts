declare global {
	export type ClientVersionV1 = {
		code: ClientCode;
		name: string;
		varsion: string;
		commit: string;
	};
	export type ClientCode =
		| "BU" // besu
		| "EJ" // ethereumJs
		| "EG" // erigon
		| "GE" // go-ethereum
		| "GR" // gradine
		| "LH" // lighthouse
		| "LS" // lodestar
		| "NM" // nethermind
		| "NB" // nimbus
		| "TE" // thin-execution
		| "TK" // teku
		| "PM" // prysm
		| "RH"; // reth
}

export { };
