import { AccountTypes } from '../../enums/AccountTypes'
import { Currencies } from '../../enums/Currencies'

export interface Account {
	title: string | null
	type: AccountTypes | null
	emoji: string | null
	isBusiness: boolean
	initialBalance: number
	currency: keyof typeof Currencies | null
	loan: number | null
	interestRate: number
}
