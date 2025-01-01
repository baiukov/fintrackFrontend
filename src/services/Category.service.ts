import Constants from 'expo-constants'
import { Endpoints } from '../enums/Endpoints'
import { Category } from '../model/Category'
import { Service } from './Service'

export class CategoryService extends Service {
	protected static instance: CategoryService | null = null

	protected baseUrl: string = Constants.expoConfig?.extra?.API_URL + '/category'

	private constructor() {
		super()
	}

	public static getInstance(): CategoryService {
		if (CategoryService.instance === null) {
			CategoryService.instance = new CategoryService()
		}

		return CategoryService.instance
	}

	public async create(userId: string, name: string, emoji: string) {
		const uri = this.baseUrl + Endpoints.CATEGORY_CREATE

		console.log(emoji.toString())

		const icon = emoji.toString()
		const response = await this.api.post(uri, {
			userId,
			name,
			icon,
		})

		console.log(response.data)
	}

	public async getAll(userId: string): Promise<Category[]> {
		const uri = this.baseUrl + Endpoints.CATEGORY_GETALL

		const response = await this.api.get(uri, {
			params: {
				userId,
			},
		})

		return response.data
	}
}
