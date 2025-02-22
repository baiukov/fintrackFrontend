import Constants from 'expo-constants'
import { Endpoints } from '../enums/Endpoints'
import { Service } from './Service'

export class TinkService extends Service {
	protected static instance: TinkService | null = null

	protected baseUrl: string = Constants.expoConfig?.extra?.API_URL + '/tink'

	private constructor() {
		super()
	}

	public static getInstance(): TinkService {
		if (TinkService.instance === null) {
			TinkService.instance = new TinkService()
		}

		return TinkService.instance
	}

	public async fetchUrl(userId: string): Promise<string | undefined> { 
		try {
			const uri = this.baseUrl + Endpoints.GENERATE_LINK
			const response = await this.api.get(uri, {
				params: {
					userId: userId
				}
			})
			return response.data
		} catch (error) {
			console.error("Error getting auth URL", error);
		}
	}

}
