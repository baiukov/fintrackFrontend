import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { RootState } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './SignupPage.styles'

interface FormProps {
	email: string
	username: string
	password: string
	repeatPassword: string
}

export const SignupPage = (props: any) => {
	const language = useSelector(
		(state: RootState) => state.language.language
	) as unknown as Record<string, string>

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

		if (!values.email) {
			errors.email = language.MISSING_EMAIL
		}

		if (!values.password) {
			errors.password = language.MISSING_PASSWORD
		}

		if (!values.username) {
			errors.username = language.MISSING_USERNAME
		}

		if (!values.repeatPassword) {
			errors.password = language.MISSING_REPEAT_PASSWORD
		}

		return errors
	}

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background, GlobalStyles.center]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<Formik
					initialValues={{
						email: '',
						username: '',
						password: '',
						repeatPassword: '',
					}}
					validate={validate}
					onSubmit={() => {}}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={styles.form}>
							<Text style={GlobalStyles.header}>
								{`${language.SIGNUP_PAGE}`}
							</Text>

							<View style={styles.textFields}>
								<TextField
									value={props.values.email}
									placeholder={language.LOGIN}
									handleChange={props.handleChange('email')}
								/>
								<TextField
									value={props.values.username}
									placeholder={language.USERNAME}
									handleChange={props.handleChange('username')}
								/>
								<TextField
									value={props.values.password}
									placeholder={language.PASSWORD}
									handleChange={props.handleChange('passowrd')}
								/>
								<TextField
									value={props.values.repeatPassword}
									placeholder={language.REPEAT_PASSWORD}
									handleChange={props.handleChange('repeatPassword')}
								/>
							</View>
							<View>
								<MainButton
									title={language.SIGNUP}
									variant={Buttons.PRIMARY}
									callback={() => {}}
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
