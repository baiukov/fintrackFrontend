import { Frequencies } from '../../enums/Frequencies'

export class StandingOrder {
	private frequency: keyof typeof Frequencies | null
	private startDate: Date
	private endDate: Date | null
	private daysForRemind: number | null

	constructor(
		frequency: keyof typeof Frequencies | null,
		startDate: Date | null,
		endDate: Date | null,
		daysForRemind: number | null
	) {
		this.frequency = frequency
		this.startDate = startDate || new Date()
		this.endDate = endDate
		this.daysForRemind = daysForRemind
	}

	getFrequency(): keyof typeof Frequencies | null {
		return this.frequency
	}

	setFrequency(frequency: keyof typeof Frequencies | null): void {
		this.frequency = frequency
	}

	getStartDate(): Date {
		return this.startDate
	}

	setStartDate(startDate: Date): void {
		this.startDate = startDate
	}

	getEndDate(): Date | null {
		return this.endDate
	}

	setEndDate(endDate: Date | null): void {
		this.endDate = endDate
	}

	getDaysForRemind(): number | null {
		return this.daysForRemind
	}

	setDaysForRemind(daysForRemind: number | null): void {
		this.daysForRemind = daysForRemind
	}
}
