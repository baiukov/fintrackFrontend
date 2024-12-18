import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './SignupPage.styles'

interface FormProps {
	email: string
	username: string
	password: string
	repeatPassword: string
}

export const SignupPage = (props: any) => {
	const language = useStore((state: any) => state.language)

	function transferToLogin() {
		props.navigation.replace(Pages.LOGIN)
	}

	const validate = (values: FormProps) => {
		const errors: {
			email?: string
			username?: string
			password?: string
			repeatPassword?: string
		} = {}

		const regex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

		if (!values.email) {
			errors.email = language.MISSING_EMAIL
		} else if (!regex.test(values.email)) {
			errors.email = language.WRONG_EMAIL
		}

		if (!values.password) {
			errors.password = language.MISSING_PASSWORD
		}

		if (!values.username || values.username.length < 4) {
			errors.username = language.MISSING_USERNAME
		}

		if (!values.repeatPassword) {
			errors.repeatPassword = language.MISSING_REPEAT_PASSWORD
		} else if (values.password !== values.repeatPassword) {
			errors.repeatPassword = language.PASSWORDS_DONT_MATCH
		}

		return errors
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
					<Text style={GlobalStyles.header}>{`${language.SIGNUP_PAGE}`}</Text>
				</View>
				<Formik
					initialValues={{
						email: '',
						username: '',
						password: '',
						repeatPassword: '',
					}}
					validate={validate}
					onSubmit={() => {
						props.navigation.navigate(Pages.MAIN_MENU)
					}}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={styles.form}>
							<View style={[styles.textFields, GlobalStyles.center]}>
								<TextField
									value={props.values.email}
									placeholder={language.EMAIL}
									handleChange={props.handleChange('email')}
									error={props.errors.email}
								/>
								<TextField
									value={props.values.username}
									placeholder={language.USERNAME}
									handleChange={props.handleChange('username')}
									error={props.errors.username}
								/>
								<TextField
									value={props.values.password}
									placeholder={language.PASSWORD}
									handleChange={props.handleChange('password')}
									error={props.errors.password}
								/>
								<TextField
									value={props.values.repeatPassword}
									placeholder={language.REPEAT_PASSWORD}
									handleChange={props.handleChange('repeatPassword')}
									error={props.errors.repeatPassword}
								/>
							</View>
							<View style={GlobalStyles.center}>
								<MainButton
									title={language.SIGNUP}
									variant={Buttons.PRIMARY}
									callback={props.handleSubmit}
								/>
								<MainButton
									title={language.LOGIN}
									variant={Buttons.SECONDARY}
									callback={transferToLogin}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
