import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DatePicker } from '../../../components/ui/datePicker/DatePicker'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Tabs } from '../../../components/ui/tabs/Tabs'
import { AccountTypes } from '../../../enums/AccountTypes'
import { Buttons } from '../../../enums/Buttons'
import { Currencies } from '../../../enums/Currencies'
import { Pages } from '../../../enums/Pages'
import { TransactionTypes } from '../../../enums/TransactionTypes'
import { Account } from '../../../model/Account'
import { Transaction } from '../../../model/Transaction'
import { User } from '../../../model/User'
import { AccountService } from '../../../services/Account.service'
import { AssetService } from '../../../services/Asset.service'
import { CategoryService } from '../../../services/Category.service'
import { TransactionService } from '../../../services/Transaction.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface TransactionEditorProps {
	navigation: any
	route: any
	transactionForm: Transaction | undefined
	availableReceivers: { label: string; value: string }[]
	availableAccounts: { label: string; value: string }[]
	availableAssets: { label: string; value: string }[]
}

interface FormProps {
	receiver: string | null
	type: TransactionTypes
	amount: number
	currency: keyof typeof Currencies
	category: string,
	assetId: string
	date: Date | undefined
	position: { lat: number; lon: number }
	description: string
}

export const TransactionEditor = (props: TransactionEditorProps) => {
	const language = useStore((state: any) => state.language)
	const account: Account = useStore((state: any) => state.account)
	const user: User = useStore((state: any) => state.user)

	let transactionForm = props.route.params?.transactionForm || {} as Transaction
	transactionForm = {...transactionForm, executionDateTime: new Date(transactionForm.executionDateTime)}

	const transactionTypes = [] as { title: string; component: React.ComponentType }[]
	Object.values(TransactionTypes).map(type => {
		if (
			AccountTypes[account.type as keyof typeof AccountTypes] != AccountTypes.BUSINESS_ACCOUNT
		) {
			if (type === TransactionTypes.REVENUE || type === TransactionTypes.COST) {
				return
			}
		}
		transactionTypes.push({ title: type, component: () => {return <></>} })
	})

	const currencies = Object.values(Currencies).map(currency => {
		return { label: currency.name, value: currency.name }
	})

	const [assets, setAssets] = React.useState<{label: string, value: string} []>([])
	React.useEffect(() => {
		const fetchData = async () => {
			const service = AssetService.getInstance()
			const data = await service.getAllByAccount(account.id)
			const assets = data.filter(asset => asset != null)
			 .filter(asset => asset.name != null)
			 .filter(asset => asset.id != null)
			 .map(asset => {
				return { label: asset.name, value: asset.id }
			}) as {label: string, value: string} []
			setAssets(assets)
		}
		fetchData()
	}, [account.id])

	const [receivers, setReceivers] = React.useState<{label: string, value: string} []>([])
	React.useEffect(() => {
		const fetchData = async () => {
			const service = AccountService.getInstance()
			const data = await service.retrieveAll(user.id)
			const receivers = data.filter(receiver => receiver != null)
			 .filter(receiver => receiver.name != null)
			 .filter(receiver => receiver.id != null)
			 .map(receiver => {
				return { label: receiver.name, value: receiver.id }
			}) as {label: string, value: string} []
			setReceivers(receivers)
		}
		fetchData()
	}, [user.id])

	const [categories, setCategories] = React.useState<{label: string, value: string} []>([])
	React.useEffect(() => {
		const fetchData = async () => {
			const service = CategoryService.getInstance()
			const data = await service.getAll(user.id)
			const categories = data.filter(category => category != null)
			 .filter(category => category.name != null)
			 .filter(category => category.id != null)
			 .map(category => {
				return { label: category.name, value: category.id }
			}) as {label: string, value: string} []
			setCategories(categories)
		}
		fetchData()
	}, [user.id])


	const [standingOrder, setStandingOrderForm] = React.useState(props.route.params?.standingOrder)
	const handleSubmit = (values: FormProps) => {

		const service = TransactionService.getInstance()
		const transactionTypeKey = Object.keys(TransactionTypes).find(key => TransactionTypes[key as keyof typeof TransactionTypes] === values.type);

		if (props.route.params?.isEdit) {
			service.update(
				transactionForm.id,
				account.id,
				values.assetId,
				values.receiver,
				transactionTypeKey as keyof typeof TransactionTypes,
				values.amount,
				values.date,
				values.description,
				values.position.lat,
				values.position.lon,
			)
		} else {
		  service.create(
				account.id,
				values.assetId,
				values.category,
				values.receiver,
				transactionTypeKey as keyof typeof TransactionTypes,
				values.amount,
				values.date,
				values.description,
				values.position.lat,
				values.position.lon,
			).then((transaction) => {
				if (standingOrder) {
					service.createStandingOrder(
						user.id,
						transaction.id,
						standingOrder.frequency,
						standingOrder.startDate,
						standingOrder.endDate,
						parseInt(standingOrder.daysForRemind)
					)
				}
			})
			
		}

		props.navigation.replace(Pages.HOME_PAGE)
	}

	const transferToStandingOrderEditor = () => {
		const isEdit = props.route.params?.isEdit
		props.navigation.navigate(Pages.STANDING_ORDER_EDITOR, {
			transactionId: isEdit ? transactionForm.id : null,
		})

	}

	const validationSchema = Yup.object().shape({
		amount: Yup.number()
			.min(1, language.MIN_1)
			.max(2 ** 31 - 1, language.TOO_BIG)
			.positive(language.POSITIVE)
			.required(language.AMOUNT_REQUIRED),
		type: Yup.string().required(language.TYPE_REQUIRED),
		currency: Yup.string().required(language.MISSING_CURRENCY),
		description: Yup.string().max(1024, language.TOO_LONG),
	})

	const handleDeletion = () => {
		const service = TransactionService.getInstance()
		service.delete(transactionForm.id, user.id)
		props.navigation.replace(Pages.HOME_PAGE)
	}

	console.log(transactionForm)

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={GlobalStyles.headerWrapper}>
					<Text style={GlobalStyles.header}>{`${language.EDITOR}`}</Text>
				</View>

				<Formik<FormProps>
					initialValues={{
						receiver: transactionForm.receiver || '',
						assetId: transactionForm.forAsset?.name || '',
						type: transactionForm.type || TransactionTypes.EXPENSE,
						amount: transactionForm.amount || 0,
						category: transactionForm.category?.name || '',
						currency: (account.currency || Currencies.CZK.name) as keyof typeof Currencies,
						date: transactionForm.executionDateTime || new Date(),
						position: { lat: transactionForm.lat, lon: transactionForm.lon },
						description: transactionForm.note || '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<ScrollView style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<View style={{ width: '90%', height: 75 }}>
									<Tabs
										style={{
											tabBarScrollEnabled: false,
											fontSize: 14,
										}}
										tabs={transactionTypes}
										callback={props.handleChange('type')}
									/>
								</View>
								{
									props.values.type === TransactionTypes.TRANSFER ?
										<DropDown
											placeholder={language.CHOOSE_RECEIVER}
											items={receivers}
											handleChange={props.handleChange('receiver')}
											error={props.errors.receiver}
										/>
									: null
								}

								<TextField
									value={props.values.amount.toString()}
									placeholder={language.AMOUNT}
									handleChange={props.handleChange('amount')}
									error={props.errors.amount}
								/>

								<DropDown
									placeholder={language.SELECT_CATEGORY}
									items={categories}
									currentValue={props.values.category}
									error={props.errors.category as string}
									handleChange={props.handleChange('category')}
								/>

								<DropDown
									placeholder={language.SELECT_CURRENCY}
									items={currencies}
									currentValue={props.values.currency}
									error={props.errors.currency as string}
									handleChange={props.handleChange('currency')}
								/>

								<DropDown
									placeholder={language.SELECT_ASSET}
									items={assets}
									currentValue={props.values.assetId}
									error={props.errors.assetId as string}
									handleChange={props.handleChange('assetId')}
								/>

								<DatePicker
									title={language.TRANSACTION_DATE}
									selectedDate={props.values.date}
									handleChange={function (
										_: DateTimePickerEvent,
										date?: Date | undefined
									): void {
										props.setFieldValue('date', date)
									}}
								/>

								<TextField
									placeholder={language.DESCRIPTION}
									value={props.values.description}
									handleChange={props.handleChange('description')}
								/>
							</View>
							<View style={[GlobalStyles.center, GlobalStyles.bottomMenu]}>
								<MainButton
									title={language.SAVE}
									variant={Buttons.PRIMARY}
									callback={props.handleSubmit}
								/>
								<MainButton
									title={language.STANDING_ORDER}
									variant={Buttons.SECONDARY}
									callback={transferToStandingOrderEditor}
								/>
								<MainButton
									title={language.DELETE}
									variant={Buttons.SECONDARY}
									callback={handleDeletion}
								/>
							</View>
						</ScrollView>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
