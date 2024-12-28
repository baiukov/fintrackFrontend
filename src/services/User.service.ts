import Constants from 'expo-constants'
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

	public async login(
		email: string | null,
		login: string | null,
		password: string
	) {
		const endpoint = '/login'
		const uri = this.baseUrl + endpoint
		const response = await this.api.post(uri, {
			email,
			login,
			password,
		})

		const user = response.data
		useStore.setState({ user: user })

		return user
	}
}
