import { AccountTypes } from '../enums/AccountTypes'
import { Currencies } from '../enums/Currencies'

export interface Account {
	id: string
	name: string
	type: keyof AccountTypes
	currency: keyof typeof Currencies
	initialAmount: number
	interestRate: number
	goalAmount: number
	alreadyPaidAmount: number
}
