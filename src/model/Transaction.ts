import { TransactionTypes } from '../enums/TransactionTypes'
import { Account } from './Account'
import { Asset } from './ui/Asset'

export interface Transaction {

	id: string,
	account: Account
	forAsset: Asset
	receiver: string | null,
	category: string | null,
	type: TransactionTypes,
	amount: number,
	note: string | null,
	lat: number,
	lon: number,
	icon: string,
	executionDateTime: Date
}