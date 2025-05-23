import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../../enums/Buttons'
import { Currencies } from '../../../enums/Currencies'
import { Pages } from '../../../enums/Pages'
import { Account } from '../../../model/ui/Account'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface AccountEditorProps {
	navigation: any
	route: any
	accountForm: Account
}

interface FormProps {
	balance: string
	currency: keyof typeof Currencies | null
}

export const AccountEditorPage2 = (props: AccountEditorProps) => {
	const language = useStore((state: any) => state.language)

	const [accountForm, setAccountForm] = React.useState(
		props.route.params?.accountForm || ({} as Account)
	)

	const validationSchema = Yup.object().shape({
		balance: Yup.number().typeError(language.WRONG_BALANCE),
		currency: Yup.string().required(language.MISSING_CURRENCY),
	})

	const currencies = Object.values(Currencies).map(currency => {
		return { label: currency.name, value: currency.name }
	})

	const handleSubmit = (values: FormProps) => {
		const updatedForm = {
			...accountForm,
			initialBalance: parseFloat(values.balance),
			currency: values.currency,
		}
		setAccountForm(updatedForm)

		setTimeout(() => {
			props.navigation.navigate(Pages.ACCOUNT_EDITOR3, {
				accountForm: updatedForm,
				isEdit: props.route.params?.isEdit || false,
				setRerender: props.route.params?.setRerender,
			})
		}, 0)
	}

	const initialBalance = accountForm.initialAmount || 0
	let shownBalance = initialBalance === 0 ? '' : initialBalance.toString()

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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 2/3`}</Text>
				</View>

				<Formik
					initialValues={{
						balance: shownBalance,
						currency: accountForm.currency || null,
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<TextField
									value={props.values.balance}
									keyboardType={'numeric'}
									maxLength={15}
									placeholder={language.BALANCE}
									handleChange={props.handleChange('balance')}
									error={props.errors.balance}
								/>
								<DropDown
									placeholder={language.SELECT_CURRENCY}
									items={currencies}
									currentValue={props.values.currency as string | undefined}
									error={props.errors.currency as string}
									handleChange={props.handleChange('currency')}
								/>
							</View>
							<View style={GlobalStyles.center}>
								<MainButton
									title={language.GO}
									variant={Buttons.PRIMARY}
									callback={props.handleSubmit}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
