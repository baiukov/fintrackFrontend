import { Frequencies } from '../../enums/Frequencies'

export interface StandingOrder {
	frequency: keyof typeof Frequencies | null
	startDate: Date
	endDate: Date | null
	daysForRemind: number | null
}
