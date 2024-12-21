import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
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
	loan: string
	interestRate: string
}

interface FormProps {
	loan: string
	interestRate: string
}

export const AccountEditorPage3 = (props: AccountEditorProps) => {
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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 3/3`}</Text>
				</View>

				<Formik
					initialValues={{
						loan: props.loan,
						interestRate: props.interestRate,
					}}
					// validate={validate}
					onSubmit={values => {
						props.navigation.navigate(Pages.MAIN_MENU, {
							title: props.title,
							type: props.type,
							icon: props.icon,
							color: props.color,
							isBusiness: props.isBusiness,
							initialBalance: props.balance,
							currency: props.currency,
						})
					}}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<TextField
									value={props.values.loan}
									keyboardType={'numeric'}
									maxLength={15}
									placeholder={language.LOAN}
									handleChange={props.handleChange('loan')}
									error={props.errors.loan}
								/>
								<TextField
									value={props.values.interestRate}
									keyboardType={'numeric'}
									maxLength={15}
									placeholder={language.INTEREST_RATE}
									handleChange={props.handleChange('interestRate')}
									error={props.errors.interestRate}
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
