import { AccountTypes } from '../../enums/AccountTypes'
import { Currencies } from '../../enums/Currencies'

export class Account {
	private title: string | null
	private type: AccountTypes | null
	private emoji: string | null
	private isBusiness: boolean
	private initialBalance: number
	private currency: keyof typeof Currencies | null
	private loan: number | null
	private interestRate: number

	constructor(
		title: string | null,
		type: AccountTypes | null,
		emoji: string | null,
		isBusiness: boolean | null,
		initialBalance: number | null,
		currency: keyof typeof Currencies | null,
		loan: number | null,
		interestRate: number | null
	) {
		this.title = title
		this.type = type
		this.emoji = emoji
		this.isBusiness = isBusiness || false
		this.initialBalance = initialBalance || 0
		this.currency = currency
		this.loan = loan || 0
		this.interestRate = interestRate || 1
	}

	// Getters
	getTitle(): string | null {
		return this.title
	}

	getEmoji(): string | null {
		return this.emoji
	}

	getType(): AccountTypes | null {
		return this.type
	}

	getIsBusiness(): boolean | null {
		return this.isBusiness
	}

	getInitialBalance(): number {
		return this.initialBalance
	}

	getCurrency(): keyof typeof Currencies | null {
		return this.currency
	}

	getLoan(): number | null {
		return this.loan
	}

	getInterestRate(): number | null {
		return this.interestRate
	}

	// Setters
	setTitle(title: string | null): void {
		this.title = title
	}

	setType(type: AccountTypes | null): void {
		this.type = type
	}

	setEmoji(emoji: string | null): void {
		this.emoji = emoji
	}

	setIsBusiness(isBusiness: boolean): void {
		this.isBusiness = isBusiness
	}

	setInitialBalance(initialBalance: number): void {
		this.initialBalance = initialBalance
	}

	setCurrency(currency: keyof typeof Currencies | null): void {
		this.currency = currency
	}

	setLoan(loan: number): void {
		this.loan = loan
	}

	setInterestRate(interestRate: number): void {
		this.interestRate = interestRate
	}
}
