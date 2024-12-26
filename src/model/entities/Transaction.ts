import { Currencies } from '../../enums/Currencies'
import { TransactionTypes } from '../../enums/TransactionTypes'

export class Transaction {
	private type: TransactionTypes
	private receiverId: string | null
	private amount: number
	private currency: keyof typeof Currencies | null
	private accountId: string | null
	private assetId: string | null
	private date: Date | null
	private position: { lat: string; lon: string } | null
	private description: string | null

	constructor(
		type: TransactionTypes | null,
		receiverId: string | null,
		amount: number | null,
		currency: keyof typeof Currencies | null,
		accountId: string | null,
		assetId: string | null,
		date: Date | null,
		position: { lat: string; lon: string } | null,
		description: string | null
	) {
		this.type = type || TransactionTypes.EXPENSE
		this.receiverId = receiverId
		this.amount = amount || 0
		this.currency = currency || null
		this.accountId = accountId
		this.assetId = assetId
		this.date = date || null
		this.position = position || null
		this.description = description || null
	}

	getType(): TransactionTypes {
		return this.type
	}

	setType(type: TransactionTypes): void {
		this.type = type
	}

	getReceiverId(): string | null {
		return this.receiverId
	}

	setReceiverId(receiverId: string | null): void {
		this.receiverId = receiverId
	}

	getAmount(): number {
		return this.amount
	}

	setAmount(amount: number): void {
		this.amount = amount
	}

	getCurrency(): keyof typeof Currencies | null {
		return this.currency
	}

	setCurrency(currency: keyof typeof Currencies | null): void {
		this.currency = currency
	}

	getAccountId(): string | null {
		return this.accountId
	}

	setAccountId(accountId: string | null): void {
		this.accountId = accountId
	}

	getAssetId(): string | null {
		return this.assetId
	}

	setAssetId(assetId: string | null): void {
		this.assetId = assetId
	}

	getDate(): Date | null {
		return this.date
	}

	setDate(date: Date | null): void {
		this.date = date
	}

	getPosition(): { lat: string; lon: string } | null {
		return this.position
	}

	setPosition(position: { lat: string; lon: string } | null): void {
		this.position = position
	}

	getDescription(): string | null {
		return this.description
	}

	setDescription(description: string | null): void {
		this.description = description
	}
}
