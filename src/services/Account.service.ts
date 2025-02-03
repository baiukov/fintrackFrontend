import Constants from 'expo-constants'
import { Endpoints } from '../enums/Endpoints'
import { Group } from '../model/Group'
import { Service } from './Service'

export class AccountService extends Service {
	protected static instance: AccountService | null = null

	protected baseUrl: string = Constants.expoConfig?.extra?.API_URL + '/account'

	private constructor() {
		super()
	}

	public static getInstance(): AccountService {
		if (AccountService.instance === null) {
			AccountService.instance = new AccountService()
		}

		return AccountService.instance
	}

	public async retrieveAll(userId: string): Promise<Group[]> {
		const uri = this.baseUrl + Endpoints.RETRIEVE_ALL
		console.log(userId)
		const response = await this.api.get(uri, {
			params: {
				userId,
			},
		})
		return response.data
	}

	public async getNetworth(
		id: string,
		fromDate?: Date,
		endDate?: Date
	): Promise<number> {
		const uri = this.baseUrl + Endpoints.GET_NETWORTH
		const response = await this.api.get(uri, {
			params: {
				id,
				fromDate,
				endDate,
			},
		})
		return response.data
	}

	public async fetchByUserIdAndAccountName(userId: string, name: string, limit: number) 
	{ 
		const uri = this.baseUrl + Endpoints.FETCH_ACCOUNT_BY_USER_ID_AND_ACCOUNT_NAME
		const response = await this.api.get(uri, {
			params: {
				userId,
				name,
				limit,
			},
		})

		return response.data
	}
}
