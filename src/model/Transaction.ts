import { Category } from 'rn-emoji-picker/dist/interfaces'
import { TransactionTypes } from '../enums/TransactionTypes'
import { Account } from './Account'
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
	icon: string,
	executionDateTime: Date
}