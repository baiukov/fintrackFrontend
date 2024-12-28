import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DatePicker } from '../../../components/ui/datePicker/DatePicker'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Tabs } from '../../../components/ui/tabs/Tabs'
import { Buttons } from '../../../enums/Buttons'
import { Currencies } from '../../../enums/Currencies'
import { Pages } from '../../../enums/Pages'
import { TransactionTypes } from '../../../enums/TransactionTypes'
import { Transaction } from '../../../model/ui/Transaction'
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
	type: TransactionTypes | null
	amount: string
	currency: keyof typeof Currencies
	accountId: string
	assetId: string
	date: Date
	position: { lat: number; lon: number }
	description: string
}

export const TransactionEditor = (props: TransactionEditorProps) => {
	const language = useStore((state: any) => state.language)

	const transactionForm =
		props.route.params?.transactionForm ||
		new Transaction(null, null, null, null, null, null, null, null, null)

	const transactonTypes = Object.values(TransactionTypes).map(type => {
		return { title: type, component: () => <></> }
	})

	const currencies = Object.values(Currencies).map(currency => {
		return { label: currency, value: currency }
	})

	const handleSubmit = (values: FormProps) => {
		props.navigation.replace(Pages.HOME_PAGE)
	}

	const receivers = props.availableReceivers || []
	const accounts = props.availableAccounts || []
	const assets = props.availableAssets || []

	const transferToStandingOrderEditor = () => {
		props.navigation.navigate(Pages.STANDING_ORDER_EDITOR)
	}

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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 1/3`}</Text>
				</View>

				<Formik
					initialValues={{
						receiver: transactionForm.getReceiverId() || '',
						accountId: transactionForm.getAccountId() || '',
						assetId: transactionForm.getAssetId() || '',
						type: transactionForm.getType() || TransactionTypes.EXPENSE,
						amount: transactionForm.getAmount() || '',
						currency: transactionForm.getCurrency() || Currencies.CZK,
						asset: transactionForm.getAssetId() || '',
						date: transactionForm.getDate() || new Date(),
						position: transactionForm.getPosition() || { lat: 0, lon: 0 },
						description: transactionForm.getDescription() || '',
					}}
					// validationSchema={validationSchema}
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
										tabs={transactonTypes}
									/>
								</View>
								<DropDown
									placeholder={language.CHOOSE_RECEIVER}
									items={receivers}
									handleChange={props.handleChange('receiver')}
									error={props.errors.receiver}
								/>

								<TextField
									value={props.values.amount}
									placeholder={language.AMOUNT}
									handleChange={props.handleChange('amount')}
									error={props.errors.amount}
								/>

								<DropDown
									placeholder={language.SELECT_CURRENCY}
									items={currencies}
									error={props.errors.currency as string}
									handleChange={props.handleChange('currency')}
								/>

								<DropDown
									placeholder={language.SELECT_ACCOUNT}
									items={accounts}
									error={props.errors.accountId as string}
									handleChange={props.handleChange('accountId')}
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
