export class Category {
	private name: string | null
	private emoji: string | null

	constructor(name: string | null, emoji: string | null) {
		this.name = name
		this.emoji = emoji
	}

	public getName(): string | null {
		return this.name
	}

	public setName(name: string): void {
		this.name = name
	}

	public getEmoji(): string | null {
		return this.emoji
	}

	public setEmoji(emoji: string): void {
		this.emoji = emoji
	}
}
