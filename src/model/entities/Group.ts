export class Group {
	private name: string | null
	private userNames: string[] | null
	private accountNames: string[] | null

	constructor(
		name: string | null,
		userNames: string[] | null,
		accountNames: string[] | null
	) {
		this.name = name
		this.userNames = userNames
		this.accountNames = accountNames
	}

	getName() {
		return this.name
	}

	setName(name: string) {
		this.name = name
	}

	getUserNames() {
		return this.userNames
	}

	setUserNames(userNames: string[]) {
		this.userNames = userNames
	}

	getAccountNames() {
		return this.accountNames
	}

	setAccountNames(accountNames: string[]) {
		this.accountNames = accountNames
	}
}
