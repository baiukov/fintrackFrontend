import Constants from 'expo-constants'
import { Endpoints } from '../enums/Endpoints'
import { Asset } from '../model/ui/Asset'
import { Service } from './Service'

export class AssetService extends Service {
	protected static instance: AssetService | null = null

	protected baseUrl: string = Constants.expoConfig?.extra?.API_URL + '/asset'

	private constructor() {
		super()
	}

	public static getInstance(): AssetService {
		if (AssetService.instance === null) {
			AssetService.instance = new AssetService()
		}

		return AssetService.instance
	}

	public async add(
		senderId: string,
		name: string,
		type: string,
		accountId: string,
		acquisitionPrice: number,
		depreciationPrice: number,
		startDateStr: string,
		endDateStr: string,
		icon: string,
	): Promise<void> {
		const uri = this.baseUrl + Endpoints.ADD_ASSET
		const response = await this.api.post(uri, {
			senderId,
			name,
			type,
			accountId,
			acquisitionPrice,
			depreciationPrice,
			startDateStr,
			endDateStr,
			icon,
		})

		return response.data
	}

	public async getAll(userId: string): Promise<Asset[]> {
		const uri = this.baseUrl + Endpoints.GET_ALL_ASSETS
		const response = await this.api.get(uri, {
			params: {
				userId,
			},
		})
		return response.data
	}
}