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
import { styles } from './LoginPage.styles'

export const LoginPage = (props: any) => {
	const language = useSelector(
		(state: RootState) => state.language.language
	) as unknown as Record<string, string>

	const validate = (values: { login: string; password: string }) => {
		const errors: { login?: string; password?: string } = {}

		if (!values.login) {
			errors.login = language.MISSING_LOGIN
		}

		if (!values.password) {
			errors.password = language.MISSING_PASSWORD
		}

		return errors
	}

	const transferToSignup = () => {
		props.navigation.replace(Pages.SIGNUP)
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
					initialValues={{ login: '', password: '' }}
					validate={validate}
					onSubmit={() => {
						props.navigation.navigate(Pages.PINCODE_LOGIN)
					}}
				>
					{(props: FormikProps<{ login: string; password: string }>) => (
						<View style={styles.form}>
							<Text style={GlobalStyles.header}>
								{`${language.LOGIN_PAGE}`}
							</Text>

							<View style={styles.textFields}>
								<TextField
									value={props.values.login}
									placeholder={language.LOGIN}
									handleChange={props.handleChange('login')}
									error={props.errors.login}
								/>
								<TextField
									value={props.values.password}
									placeholder={language.PASSWORD}
									handleChange={props.handleChange('password')}
									secureTextEntry={true}
									error={props.errors.password}
								/>
							</View>
							<View>
								<MainButton
									title={language.LOGIN}
									variant={Buttons.PRIMARY}
									callback={() => {
										props.handleSubmit()
									}}
								/>
								<MainButton
									title={language.SIGNUP}
									variant={Buttons.SECONDARY}
									callback={transferToSignup}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
