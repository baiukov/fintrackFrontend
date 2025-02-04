import Constants from 'expo-constants'
import { Endpoints } from '../enums/Endpoints'
import { TransactionTypes } from '../enums/TransactionTypes'
import { Transaction } from '../model/Transaction'
import { Service } from './Service'

export class TransactionService extends Service {
	protected static instance: TransactionService | null = null

	protected baseUrl: string = Constants.expoConfig?.extra?.API_URL + '/transaction'

	private constructor() {
		super()
	}

	public static getInstance(): TransactionService {
		if (TransactionService.instance === null) {
			TransactionService.instance = new TransactionService()
		}

		return TransactionService.instance
	}

	public async create(
		accountId: string,
		forAssetId: string,
		categoryId: string,
		receiverId: string | null,
		type: keyof typeof TransactionTypes,
		amount: number,
		executionDateTime: Date,
		note: string,
		lat: number,
		lon: number,
		icon: string,
	): Promise<void> {
		const uri = this.baseUrl + Endpoints.CREATE_TRANSACTION
		const response = await this.api.post(uri, {
			accountId,
			forAssetId,
			receiverId,
			categoryId,
			type,
			amount,
			executionDateTime,
			note,
			lat,
			lon,
			icon,
		})

		return response.data
	}

	public async update(
		id: string,
		accountId: string,
		forAssetId: string,
		receiverId: string | null,
		type: keyof typeof TransactionTypes,
		amount: number,
		executionDateTime: Date,
		note: string,
		lat: number,
		lon: number,
		icon: string,
	): Promise<void> {
		const uri = this.baseUrl + Endpoints.UPDATE_TRANSACTION
		const response = await this.api.patch(uri, {
			id,
			accountId,
			forAssetId,
			receiverId,
			type,
			amount,
			executionDateTime,
			note,
			lat,
			lon,
			icon,
		})

		return response.data
	}

	public async delete(transactionId: string, userId: string): Promise<void> {
		const uri = this.baseUrl + Endpoints.DELETE_TRANSACTION
		const response = await this.api.delete(uri, {
			params: {
				transactionId,
				userId
			},
		})

		return response.data
	}

	public async getAll(accountId: string): Promise<Transaction[]> {
		const uri = this.baseUrl + Endpoints.GET_ALL_TRANSACTION
		const response = await this.api.get(uri, {
			params: {
				accountId,
			},
		})
		return response.data
	}
}
