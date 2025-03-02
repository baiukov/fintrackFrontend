import Constants from 'expo-constants'
import * as FileSystem from 'expo-file-system'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Sharing from 'expo-sharing'
import { Alert, Platform } from 'react-native'
import { Endpoints } from '../enums/Endpoints'
import { Account } from '../model/Account'
import { Group } from '../model/Group'
import { Service } from './Service'

export class AccountService extends Service {
	protected static instance: AccountService | null = null

	protected baseUrl: string = Constants.expoConfig?.extra?.API_URL + '/account'
	protected tinkUrl: string = Constants.expoConfig?.extra?.API_URL + '/tink'

	private constructor() {
		super()
	}

	public static getInstance(): AccountService {
		if (AccountService.instance === null) {
			AccountService.instance = new AccountService()
		}

		return AccountService.instance
	}

	public async retrieveAll(userId: string): Promise<Group[]> {
		const uri = this.baseUrl + Endpoints.RETRIEVE_ALL
		const response = await this.api.get(uri, {
			params: {
				userId,
			},
		})
		return response.data
	}

	public async getNetworth(
		id: string,
		fromDate?: string,
		endDate?: string
	): Promise<number> {
		const uri = this.baseUrl + Endpoints.GET_NETWORTH
		const response = await this.api.get(uri, {
			params: {
				id,
				fromDate,
				endDate,
			},
		})
		return response.data
	}

	public async getTotal(
		id: string,
		fromDate?: string,
		endDate?: string
	): Promise<number> {
		const uri = this.baseUrl + Endpoints.GET_TOTAL
		const response = await this.api.get(uri, {
			params: {
				id,
				fromDate,
				endDate,
			},
		})
		return response.data
	}

	public async getIncomes(
		id: string,
		fromDate?: string,
		endDate?: string
	): Promise<number> {
		const uri = this.baseUrl + Endpoints.GET_INCOMES
		const response = await this.api.get(uri, {
			params: {
				id,
				fromDate,
				endDate,
			},
		})
		return response.data
	}

	public async getExpenses(
		id: string,
		fromDate?: string,
		endDate?: string
	): Promise<number> {
		const uri = this.baseUrl + Endpoints.GET_EXPENSES
		const response = await this.api.get(uri, {
			params: {
				id,
				fromDate,
				endDate,
			},
		})
		return response.data
	}

	public async fetchByUserIdAndAccountName(
		userId: string,
		name: string,
		limit: number
	) {
		const uri =
			this.baseUrl + Endpoints.FETCH_ACCOUNT_BY_USER_ID_AND_ACCOUNT_NAME
		const response = await this.api.get(uri, {
			params: {
				userId,
				name,
				limit,
			},
		})

		return response.data
	}

	public async save(
		ownerId: string,
		name: string,
		type: string,
		currency: string,
		initialAmount: number,
		interestRate: number,
		goalAmount: number,
		alreadyPaidAmount: number,
		emoji: string
	): Promise<Account> {
		const uri = this.baseUrl + Endpoints.ADD_ACCOUNT
		const removed = false
		const response = await this.api.post(uri, {
			ownerId,
			name,
			type,
			currency,
			initialAmount,
			interestRate,
			goalAmount,
			alreadyPaidAmount,
			emoji,
			removed,
		})

		return response.data
	}

	public async update(
		ownerId: string,
		id: string,
		name: string,
		type: string,
		currency: string,
		initialAmount: number,
		interestRate: number,
		goalAmount: number,
		alreadyPaidAmount: number,
		emoji: string
	): Promise<Account> {
		const uri = this.baseUrl + Endpoints.UPDATE_ACCOUNT
		const removed = false
		const response = await this.api.patch(uri, {
			ownerId,
			id,
			name,
			type,
			currency,
			initialAmount,
			interestRate,
			goalAmount,
			alreadyPaidAmount,
			emoji,
			removed,
		})

		return response.data
	}

	public async delete(userId: string, accountId: string) {
		const uri = this.baseUrl + Endpoints.DELETE_ACCOUNT
		const response = await this.api.delete(uri, {
			params: {
				userId,
				accountId,
			},
		})

		return response.data
	}

	public async getAllWhereIsOwner(userId: string): Promise<Account[]> {
		const uri = this.baseUrl + Endpoints.GET_ALL_WHERE_IS_OWNER
		const response = await this.api.get(uri, {
			params: {
				userId,
			},
		})

		return response.data
	}

	public async getGeneralStatement(accountId: string, lang: string) {
		try {
			const fileUri = `${
				FileSystem.documentDirectory
			}${'general-statement.xlsx'}`

			const url = this.baseUrl + Endpoints.GET_GENERAL_STATEMENT
			const downloadResumable = FileSystem.createDownloadResumable(url, fileUri)
			const result = await downloadResumable.downloadAsync()

			if (!result || !result.uri) {
				throw new Error('Ошибка загрузки файла.')
			}

			if (Platform.OS === 'ios') {
				const available = await Sharing.isAvailableAsync()
				if (available) {
					await Sharing.shareAsync(result.uri)
				} else {
					Alert.alert('Error', 'Cant open file on this device')
				}
			} else {
				await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
					data: result.uri,
					flags: 1,
				})
			}
		} catch (error) {
			console.error('Error when open file', error)
			Alert.alert('Error', 'Cant open file on this device')
		}
	}

	public async getBankAccounts(accountId: string) {
		const uri = this.tinkUrl + Endpoints.GET_BANK_ACCOUNTS

		const response = await this.api.get(uri, {
			params: {
				accountId,
			},
		})

		return response.data
	}

	public async setAccountInitialAmount(id: string, initialAmount: number) {
		const uri = this.baseUrl + Endpoints.UPDATE_ACCOUNT

		const response = await this.api.patch(uri, {
			id,
			initialAmount,
		})

		return response.data
	}
}
