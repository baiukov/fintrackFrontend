import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { AccountTypes } from '../../../enums/AccountTypes'
import { Buttons } from '../../../enums/Buttons'
import { Currencies } from '../../../enums/Currencies'
import { Pages } from '../../../enums/Pages'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface AccountEditorProps {
	navigation: any
	balance: string
	currency: typeof Currencies
	title: string | undefined
	type: AccountTypes | undefined
	icon: string | undefined
	color: string | undefined
	isBusiness: boolean | undefined
}

interface FormProps {
	balance: string
	currency: typeof Currencies
}

export const AccountEditorPage2 = (props: AccountEditorProps) => {
	const language = useStore((state: any) => state.language)

	const currencies = Object.values(Currencies).map(currency => {
		return { label: currency, value: currency }
	})

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
						balance: props.balance,
						currency: props.currency,
					}}
					// validate={validate}
					onSubmit={values => {
						props.navigation.navigate(Pages.ACCOUNT_EDITOR3, {
							title: props.title,
							type: props.type,
							icon: props.icon,
							color: props.color,
							isBusiness: props.isBusiness,
							initialBalance: parseFloat(values.balance),
							currency: values.currency,
						})
					}}
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
