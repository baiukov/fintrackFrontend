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
import { Picker } from '../../../components/ui/picker/Picker'
import { Tabs } from '../../../components/ui/tabs/Tabs'
import { AccountTypes } from '../../../enums/AccountTypes'
import { Buttons } from '../../../enums/Buttons'
import { Currencies } from '../../../enums/Currencies'
import { Pages } from '../../../enums/Pages'
import { TransactionTypes } from '../../../enums/TransactionTypes'
import { Account } from '../../../model/Account'
import { Transaction } from '../../../model/ui/Transaction'
import { User } from '../../../model/User'
import { AccountService } from '../../../services/Account.service'
import { AssetService } from '../../../services/Asset.service'
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
	assetId: string
	date: Date
	position: { lat: number; lon: number }
	description: string
	emoji: string
}

export const TransactionEditor = (props: TransactionEditorProps) => {
	const language = useStore((state: any) => state.language)
	const account: Account = useStore((state: any) => state.account)
	const user: User = useStore((state: any) => state.user)

	const [transactionForm, setTransactionForm] = React.useState<Transaction>(props.route.params?.transactionForm || {} as Transaction)

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

	const handleSubmit = (values: FormProps) => {

		const service = TransactionService.getInstance()
		const transactionTypeKey = Object.keys(TransactionTypes).find(key => TransactionTypes[key as keyof typeof TransactionTypes] === values.type);

		service.create(
			account.id,
			values.assetId,
			values.receiver,
			transactionTypeKey as keyof typeof TransactionTypes,
			values.amount,
			values.date,
			values.description,
			values.position.lat,
			values.position.lon,
			values.emoji,
		)

		props.navigation.replace(Pages.HOME_PAGE)
	}

	const transferToStandingOrderEditor = () => {
		props.navigation.navigate(Pages.STANDING_ORDER_EDITOR)
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

	const recent = [
		{ emoji: '💵' },
	]

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
						receiver: transactionForm.receiverId || '',
						assetId: transactionForm.assetId || '',
						type: transactionForm.type || TransactionTypes.EXPENSE,
						amount: transactionForm.amount || 0,
						currency: (transactionForm.currency || Currencies.CZK.name) as keyof typeof Currencies,
						date: transactionForm.date || new Date(),
						position: transactionForm.position || { lat: 0, lon: 0 },
						description: transactionForm.description || '',
						emoji: transactionForm.emoji || '',
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

								<Picker
									style='emoji'
									data={recent}
									title={language.SELECT_ICON}
									onSelect={props.handleChange('emoji')}
									error={props.errors.emoji}
								/>

								<DropDown
									placeholder={language.SELECT_CURRENCY}
									items={currencies}
									error={props.errors.currency as string}
									handleChange={props.handleChange('currency')}
								/>

								<DropDown
									placeholder={language.SELECT_ASSET}
									items={assets}
									error={props.errors.assetId as string}
									handleChange={props.handleChange('assetId')}
								/>

								<DatePicker
									title={language.TRANSACTION_DATE}
									selectedDate={props.values.date}
									handleChange={function (
										event: DateTimePickerEvent,
										date?: Date | undefined
									): void {
										throw new Error('Function not implemented.')
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
							</View>
						</ScrollView>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
