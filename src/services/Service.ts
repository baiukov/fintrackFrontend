import axios, { AxiosInstance } from 'axios'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import { Pages } from '../enums/Pages'
import { navigate } from '../utils/RootNavigation'

export abstract class Service {
	protected api: AxiosInstance
	protected baseUrl: string = Constants.expoConfig?.extra?.env?.API_URL

	protected constructor() {
		this.api = axios.create({
			baseURL: this.baseUrl,
			timeout: 10000,
		})

		let isRefreshing = false
		let refreshSubscribers: ((token: string) => void)[] = []

		const refreshToken = async () => {
			try {
				const storedRefreshToken = SecureStore.getItem('refreshToken')
				if (!storedRefreshToken) throw new Error('No refresh token')

				const uri =
					Constants.expoConfig?.extra?.env?.API_URL + '/user/auth/refresh'
				const response = await axios.post(uri, {
					refreshToken: storedRefreshToken,
				})

				const newAccessToken = response.data.accessToken

				SecureStore.setItem('accessToken', newAccessToken)

				return newAccessToken
			} catch (error) {
				console.log('Error getting token', error)
				throw error
			}
		}

		this.api.interceptors.request.use(
			async config => {
				const token = SecureStore.getItem('accessToken')
				if (token) {
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			},
			error => Promise.reject(error)
		)

		this.api.interceptors.response.use(
			response => response,
			async error => {
				const originalRequest = error.config

				if (error.response?.status === 403 && !originalRequest._retry) {
					originalRequest._retry = true

					if (!isRefreshing) {
						isRefreshing = true

						try {
							const newAccessToken = await refreshToken()
							isRefreshing = false

							refreshSubscribers.forEach(callback => callback(newAccessToken))
							refreshSubscribers = []

							originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
							return this.api(originalRequest)
						} catch (err) {
							isRefreshing = false
							refreshSubscribers = []

							await SecureStore.deleteItemAsync('refreshToken')
							await SecureStore.deleteItemAsync('accessToken')
							navigate(Pages.LOGIN)

							return Promise.reject(err)
						}
					}

					return new Promise(resolve => {
						refreshSubscribers.push(token => {
							originalRequest.headers.Authorization = `Bearer ${token}`
							resolve(this.api(originalRequest))
						})
					})
				}

				return Promise.reject(error)
			}
		)
	}
}
