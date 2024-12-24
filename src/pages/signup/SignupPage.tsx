import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
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

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email(language.WRONG_EMAIL)
			.required(language.MISSING_EMAIL),
		password: Yup.string()
			.min(8, language.PASSWORD_TOO_SHORT)
			.matches(/[A-Z]/, language.PASSWORD_NO_UPPERCASE)
			.matches(/[a-z]/, language.PASSWORD_NO_LOWERCASE)
			.matches(/\d/, language.PASSWORD_NO_DIGITS)
			.test(
				'no-spaces',
				language.PASSWORD_CONTAINS_SPACES,
				value => !/\s/.test(value || '')
			)
			.required(language.MISSING_PASSWORD),
		username: Yup.string()
			.min(4, language.USERNAME_TOO_SHORT)
			.required(language.MISSING_USERNAME),
		repeatPassword: Yup.string()
			.oneOf([Yup.ref('password'), ''], language.PASSWORDS_DONT_MATCH)
			.required(language.MISSING_REPEAT_PASSWORD),
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
					<Text style={GlobalStyles.header}>{`${language.SIGNUP_PAGE}`}</Text>
				</View>
				<Formik
					initialValues={{
						email: '',
						username: '',
						password: '',
						repeatPassword: '',
					}}
					// validationSchema={validationSchema}
					onSubmit={() => {
						props.navigation.reset({
							index: 0,
							routes: [{ name: Pages.MAIN_MENU }],
						})
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
