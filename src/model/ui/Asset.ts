import { Currencies } from '../../enums/Currencies'
import { DepreciationBasis } from '../../enums/DepreciationBasis'
import { Account } from '../Account'

export interface Asset {
	id: string | null
	name: string | null
	account: Account | null
	emoji: string | null
	acquisitionPrice: number
	depreciationPrice: number
	currency: keyof typeof Currencies | null
	depreciationBasis: keyof typeof DepreciationBasis
	startDate: Date
	endDate: Date | null
}

// export function createAsset(
// 	name: string | null,
// 	accountName: string | null,
// 	emoji: string | null,
// 	acquisitionPrice: number | null,
// 	depreciationPrice: number | null,
// 	currency: keyof typeof Currencies | null,
// 	depreciationBasis: keyof typeof DepreciationBasis | null,
// 	startDate: Date | null,
// 	endDate: Date | null
// ): Asset {
// 	return {
// 		name,
// 		accountName,
// 		emoji,
// 		acquisitionPrice: acquisitionPrice || 0,
// 		depreciationPrice: depreciationPrice || 0,
// 		currency,
// 		depreciationBasis: depreciationBasis || 'NEVER',
// 		startDate: startDate || new Date(),
// 		endDate
// 	}
// }
