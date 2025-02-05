import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Account } from '../../../model/ui/Account'
import { AccountService } from '../../../services/Account.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface AccountEditorProps {
	navigation: any
	route: any
	accountForm: Account | undefined
}

interface FormProps {
	loan: string
	interestRate: string
}

export const AccountEditorPage3 = (props: AccountEditorProps) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const [accountForm, setAccountForm] = React.useState(props.route.params?.accountForm 
		|| {} as Account)

	const validationSchema = Yup.object().shape({
		loan: Yup.number().typeError(language.WRONG_LOAN),
		interestRate: Yup.number().typeError(language.WRONG_INTEREST_RATE),
	})

	const handleSubmit = (values: FormProps) => {
		const updatedForm = { ...accountForm, loan: parseFloat(values.loan), interestRate: parseFloat(values.interestRate) }

		const service = AccountService.getInstance()
		if (props.route.params?.isEdit) {
			service.update(
				updatedForm.id,
				updatedForm.name,
				updatedForm.type,
				updatedForm.currency,
				updatedForm.initialBalance,
				updatedForm.interestRate,
				updatedForm.loan,
				updatedForm.loanInterest,
				updatedForm.emoji,
			)
		} else {
			service.save(
				user.id, 
				updatedForm.name,
				updatedForm.type,
				updatedForm.currency,
				updatedForm.initialBalance,
				updatedForm.interestRate,
				updatedForm.loan,
				updatedForm.loanInterest,
				updatedForm.emoji,
			)
		}

		props.navigation.replace(Pages.MAIN_MENU, {
			accountForm: accountForm,
		})
	}

	const handleDeletion = () => {
		const service = AccountService.getInstance()
		service.delete(user.id, accountForm.id)

		props.navigation.replace(Pages.MAIN_MENU)
	}

	const initialLoan = accountForm.loan || 0
	const initialInterestRate = accountForm.interestRate || 0

	const shownLoan = initialLoan === 0 ? '' : initialLoan.toString()
	const shownInterestRate =
		initialInterestRate === 1 || initialInterestRate === 0
			? ''
			: initialInterestRate.toString()

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
						loan: shownLoan,
						interestRate: shownInterestRate,
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
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
									title={language.SAVE}
									variant={Buttons.PRIMARY}
									callback={props.submitForm}
								/>
								<MainButton
									title={language.DELETE}
									variant={Buttons.SECONDARY}
									callback={handleDeletion}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
