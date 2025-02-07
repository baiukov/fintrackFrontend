import { Account } from './Account'
import { User } from './User'

export interface Group {

	id: string
	name: string
	adminId: string | null
	users: User[] | null
	accounts: Account[] | null

}