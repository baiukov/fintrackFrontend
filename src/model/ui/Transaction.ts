import { Currencies } from '../../enums/Currencies'
import { TransactionTypes } from '../../enums/TransactionTypes'

export interface Transaction {
	type: TransactionTypes
	receiverId: string | null
	amount: number
	currency: keyof typeof Currencies | null
	accountId: string | null
	assetId: string | null
	date: Date | null
	position: { lat: number; lon: number } | null
	emoji: string,
	description: string | null
}
