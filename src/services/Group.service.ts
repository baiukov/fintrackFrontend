import Constants from 'expo-constants'
import { Endpoints } from '../enums/Endpoints'
import { Group } from '../model/Group'
import { Service } from './Service'

export class GroupService extends Service {
	protected static instance: GroupService | null = null

	protected baseUrl: string = Constants.expoConfig?.extra?.API_URL + '/group'

	private constructor() {
		super()
	}

	public static getInstance(): GroupService {
		if (GroupService.instance === null) {
			GroupService.instance = new GroupService()
		}

		return GroupService.instance
	}

	public async add(
		id: string | null, 
		name: string, 
		adminId: string, 
		memberIds: string[], 
		accountIds: string[]
	): Promise<Group> {
		const uri = this.baseUrl + Endpoints.ADD_GROUP
		const response = await this.api.post(uri, {
				id,
				name,
				adminId,
				memberIds,
				accountIds
		})
		return response.data
	}

	public async getAll(userId: string): Promise<Group[]> {
		const uri = this.baseUrl + Endpoints.GET_ALL
		const response = await this.api.get(uri, {
			params: {
				userId,
			},
		})
		return response.data
	}

}