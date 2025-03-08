import axios, { AxiosInstance } from 'axios'
import Constants from 'expo-constants'

export abstract class Service {
	protected api: AxiosInstance
	protected baseUrl: string = Constants.expoConfig?.extra?.env?.API_URL

	protected constructor() {
		this.api = axios.create({
			baseURL: this.baseUrl,
			timeout: 10000,
		})
	}
}
