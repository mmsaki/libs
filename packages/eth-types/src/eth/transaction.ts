import type { Address, Byte, Bytes, Hash32, Uint, Uint256 } from "./base";
// transaction.yaml
export interface AccessListEntry {
	address: Address;
	storageKeys: Hash32[];
}
export type TransactionUnsigned =
	| TransactionLegacyUnsigned
	| Transaction2930Unsigned
	| Transaction1559Unsigned
	| Transaction4844Unsigned
	| Transaction7702Unsigned;

export interface TransactionLegacyUnsigned {
	type: "0x0";
	nonce: Uint;
	to?: Address | null;
	gas: Uint;
	value: Uint;
	input: Bytes;
	gasPrice: Uint;
	chainId?: Uint;
}
export interface Transaction2930Unsigned {
	type: "0x1";
	nonce: Uint;
	to?: Address | null;
	gas: Uint;
	value: Uint;
	input: Bytes;
	gasPrice: Uint;
	chainId: Uint;
	accessList: AccessListEntry[];
}
export interface Transaction1559Unsigned {
	type: "0x2";
	nonce: Uint;
	to?: Address | null;
	gas: Uint;
	value: Uint;
	input: Bytes;
	gasPrice: Uint;
	maxFeePerGas: Uint;
	maxPriorityFeePerGas: Uint;
	accessList: AccessListEntry[];
	chainId: Uint;
}
export interface Transaction4844Unsigned {
	type: "0x3";
	nonce: Uint;
	to: Address;
	gas: Uint;
	value: Uint;
	input: Bytes;
	gasPrice?: Uint;
	maxFeePerGas: Uint;
	maxPriorityFeePerGas: Uint;
	maxFeePerBlobGas: Uint;
	accessList: AccessListEntry[];
	blobVersionedHashes: Hash32[];
	chainId: Uint;
}
export interface Transaction7702Unsigned {
	type: "0x4";
	nonce: Uint;
	to: Address;
	gas: Uint;
	value: Uint;
	input: Bytes;
	maxPriorityFeePerGas: Uint;
	maxFeePerGas: Uint;
	gasPrice?: Uint;
	accessList: AccessListEntry[];
	chainId: Uint;
	authorizationList: AuthorizationList;
}
export interface AuthorizationListEntry {
	chainId: Uint;
	nonce: Uint;
	address: Address;
	yParity: Byte;
	r: Uint256;
	s: Uint256;
}
export type AuthorizationList = AuthorizationListEntry[];

export type TransactionLegacySigned = {
	v: Byte;
	r: Uint;
	s: Uint;
} & TransactionLegacyUnsigned;
export type Transaction2930Signed = {
	yParity: Bytes;
	r: Uint;
	s: Uint;
	v?: Byte;
} & Transaction2930Unsigned;
export type Transaction1559Signed = {
	yParity: Bytes;
	r: Uint;
	s: Uint;
	v?: Byte;
} & Transaction1559Unsigned;
export type Transaction4844Signed = {
	yParity: Byte;
	r: Uint;
	s: Uint;
	v?: Byte;
} & Transaction4844Unsigned;
export type Transaction7702Signed = {
	yParity: Byte;
	r: Uint;
	s: Uint;
	v?: Byte;
} & Transaction7702Unsigned;
export type TransactionSigned =
	| TransactionLegacySigned
	| Transaction2930Signed
	| Transaction1559Signed
	| Transaction4844Signed
	| Transaction7702Signed;
export type TransactionInfo = {
	blockHash: Hash32;
	blockNumber: Uint;
	from: Address;
	hash: Hash32;
	transactionIndex: Uint;
} & TransactionSigned;
export interface GenericTransaction {
	type?: "0x0" | "0x1" | "0x2" | "0x3" | "04";
	to?: Address | null;
	from?: Address;
	value?: Uint;
	nonce?: Uint;
	gas?: Uint;
	input?: Bytes;
	gasPrice?: Uint;
	maxPriorityFeePerGas?: Uint;
	maxFeePerGas?: Uint;
	maxFeePerBlobGas?: Uint;
	accessList?: AccessListEntry[];
	blobVersionedHashes?: Hash32[];
	blobs?: Bytes[];
	chainId?: Uint;
	authorizationList?: AuthorizationList;
}
