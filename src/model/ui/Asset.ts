import { Currencies } from '../../enums/Currencies'
import { DepreciationBasis } from '../../enums/DepreciationBasis'
import { Account } from '../Account'

export interface Asset {
	id: string | null
	name: string | null
	account: Account | null
	icon: string | null
	acquisitionPrice: number
	depreciationPrice: number
	currency: keyof typeof Currencies | null
	depreciationBasis: keyof typeof DepreciationBasis
	startDate: Date
	endDate: Date | null
}

