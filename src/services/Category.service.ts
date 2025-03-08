import Constants from 'expo-constants'
import { Endpoints } from '../enums/Endpoints'
import { Category } from '../model/Category'
import { Service } from './Service'

export class CategoryService extends Service {
	protected static instance: CategoryService | null = null

	protected baseUrl: string =
		Constants.expoConfig?.extra?.env?.API_URL + '/category'

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

		const icon = emoji.toString()
		const response = await this.api.post(uri, {
			userId,
			name,
			icon,
		})

		return response.data
	}

	public async update(id: string, userId: string, name: string, emoji: string) {
		const uri = this.baseUrl + Endpoints.CATEGORY_UPDATE

		const icon = emoji.toString()
		const response = await this.api.patch(uri, {
			id,
			userId,
			name,
			icon,
		})

		return response.data
	}

	public async delete(categoryId: string, userId: string) {
		const uri = this.baseUrl + Endpoints.CATEGORY_DELETE

		const response = await this.api.delete(uri, {
			params: {
				categoryId,
				userId,
			},
		})

		return response.data
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
