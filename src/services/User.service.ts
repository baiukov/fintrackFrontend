import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import { Endpoints } from '../enums/Endpoints'
import { useStore } from '../storage/store'
import { Service } from './Service'

export class UserService extends Service {
	protected static instance: UserService | null = null

	protected baseUrl: string =
		Constants.expoConfig?.extra?.env?.API_URL + '/user'

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
			password,
		})

		const user = response.data
		useStore.setState({ user: user })

		return user
	}

	public async login(
		email: string | null,
		userName: string | null,
		password: string
	) {
		const uri = this.baseUrl + Endpoints.LOGIN
		const response = await this.api.post(uri, {
			email,
			userName,
			password,
		})

		console.log(response)
		const user = response.data

		return user
	}

	public getToken() {
		console.log(SecureStore.getItem('jwt'))
		return SecureStore.getItem('jwt')
	}

	public async setPincode(id: string, pincode: string) {
		const uri = this.baseUrl + Endpoints.SET_PINCODE
		const response = await this.api.post(uri, {
			id,
			pincode,
		})

		return response.data
	}

	public async verifyPincode(id: string, pincode: string): Promise<boolean> {
		const uri = this.baseUrl + Endpoints.VERIFY_PINCODE
		const response = await this.api.post(uri, {
			id,
			pincode,
		})

		return response.data
	}

	public async fetchByUserName(name: string, limit: number) {
		const uri = this.baseUrl + Endpoints.FETCH_BY_USERNAME
		const response = await this.api.get(uri, {
			params: {
				name,
				limit,
			},
		})

		return response.data
	}

	public async sendEmailCode(login: string, lang: string) {
		const uri = this.baseUrl + Endpoints.SEND_EMAIL_CODE

		const response = await this.api.post(
			uri,
			{ login, lang },
			{ timeout: 60000 }
		)

		return response
	}

	public async verifyRecoveryPincode(
		login: string,
		code: string
	): Promise<boolean> {
		const uri = this.baseUrl + Endpoints.VERIFY_RECOVERY_CODE
		const response = await this.api.post(uri, {
			login,
			code,
		})

		return response.data
	}

	public async updatePassword(login: string, password: string) {
		const uri = this.baseUrl + Endpoints.UPDATE_PASSWORD
		const response = await this.api.post(uri, {
			login,
			password,
		})

		const user = response.data

		return user
	}

	public async loginByToken(token: string) {
		const uri = this.baseUrl + '/info'

		const response = await this.api.get(uri)

		const user = response.data

		return user
	}

	public async deleteAccount(
		userId: string,
		password: string
	): Promise<boolean | string> {
		const uri = this.baseUrl + Endpoints.DELETE_USER_ACCOUNT
		const response = await this.api.delete(uri, {
			params: {
				userId: userId,
				password: password,
			},
		})

		return response.data
	}
}
