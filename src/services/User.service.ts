import Constants from 'expo-constants'
import { Endpoints } from '../enums/Endpoints'
import { useStore } from '../storage/store'
import { Service } from './Service'

export class UserService extends Service {
	protected static instance: UserService | null = null

	protected baseUrl: string = Constants.expoConfig?.extra?.API_URL + '/user'

	private constructor() {
		super()
	}

	public static getInstance(): UserService {
		if (UserService.instance === null) {
			UserService.instance = new UserService()
		}

		return UserService.instance
	}

	public async register(
		email: string | null,
		userName: string | null,
		password: string | null
	) {
		const uri = this.baseUrl + Endpoints.REGISTER
		const response = await this.api.post(uri, {
			email,
			userName,
			password
		})

		const user = response.data
		useStore.setState({ user: user })

		return user

	}

	public async login(
		email: string | null,
		login: string | null,
		password: string
	) {
		const uri = this.baseUrl + Endpoints.LOGIN
		const response = await this.api.post(uri, {
			email,
			login,
			password,
		})

		const user = response.data
		useStore.setState({ user: user })

		return user
	}

	public async setPincode(id: string, pincode: string) {
		const uri = this.baseUrl + Endpoints.SET_PINCODE
		const response = await this.api.post(uri, {
			id,
			pincode,
		})

		return response.data
	}

	public async fetchByUserName(name: string, limit: number) 
	{ 
		const uri = this.baseUrl + Endpoints.FETCH_BY_USERNAME
		const response = await this.api.get(uri, {
			params: {
				name,
				limit,
			},
		})

		return response.data
	}
}
