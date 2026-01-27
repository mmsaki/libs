import type { Address, Uint64, Uint256 } from "./base";
// withdrawal.yaml
export interface Withdrawal {
	index: Uint64;
	validatorIndex: Uint64;
	address: Address;
	amount: Uint256;
}
