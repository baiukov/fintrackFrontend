import { Currencies } from '../../enums/Currencies'
import { DepreciationBasis } from '../../enums/DepreciationBasis'

export class Asset {
	private name: string | null
	private accountName: string | null
	private emoji: string | null
	private acquisitionPrice: number
	private depreciationPrice: number
	private currency: keyof typeof Currencies | null
	private depreciationBasis: keyof typeof DepreciationBasis
	private startDate: Date
	private endDate: Date | null

	constructor(
		name: string | null,
		accountName: string | null,
		emoji: string | null,
		acquisitionPrice: number | null,
		depreciationPrice: number | null,
		currency: keyof typeof Currencies | null,
		depreciationBasis: keyof typeof DepreciationBasis | null,
		startDate: Date | null,
		endDate: Date | null
	) {
		this.name = name
		this.accountName = accountName
		this.emoji = emoji
		this.acquisitionPrice = acquisitionPrice || 0
		this.depreciationPrice = depreciationPrice || 0
		this.currency = currency
		this.depreciationBasis = depreciationBasis || 'NEVER'
		this.startDate = startDate || new Date()
		this.endDate = endDate
	}

	getName(): string | null {
		return this.name
	}

	setName(name: string | null): void {
		this.name = name
	}

	getAccountName(): string | null {
		return this.accountName
	}

	setAccountName(account: string | null): void {
		this.accountName = account
	}

	getEmoji(): string | null {
		return this.emoji
	}

	setEmoji(emoji: string | null): void {
		this.emoji = emoji
	}

	getAcquisitionPrice(): number {
		return this.acquisitionPrice
	}

	setAcquisitionPrice(acquisitionPrice: number): void {
		this.acquisitionPrice = acquisitionPrice
	}

	getDepreciationPrice(): number {
		return this.depreciationPrice
	}

	setDepreciationPrice(depreciationPrice: number): void {
		this.depreciationPrice = depreciationPrice
	}

	getCurrency(): keyof typeof Currencies | null {
		return this.currency
	}

	setCurrency(currency: keyof typeof Currencies | null): void {
		this.currency = currency
	}

	getDepreciationBasis(): keyof typeof DepreciationBasis {
		return this.depreciationBasis
	}

	setDepreciationBasis(
		depreciationBasis: keyof typeof DepreciationBasis
	): void {
		this.depreciationBasis = depreciationBasis
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
}
