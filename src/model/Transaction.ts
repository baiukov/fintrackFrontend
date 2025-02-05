import { TransactionTypes } from '../enums/TransactionTypes'
import { Account } from './Account'
import { Category } from './Category'
import { Asset } from './ui/Asset'

export interface Transaction {

	id: string,
	account: Account
	forAsset: Asset
	receiver: string | null,
	category: Category | null,
	type: TransactionTypes,
	amount: number,
	note: string | null,
	lat: number,
	lon: number,
	executionDateTime: Date
}