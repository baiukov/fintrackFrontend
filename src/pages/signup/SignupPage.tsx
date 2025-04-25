import { LinearGradient } from 'expo-linear-gradient'
import * as SecureStore from 'expo-secure-store'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { ActivityIndicator, Platform, Text, View } from 'react-native'
import * as Yup from 'yup'
import { AppleButton } from '../../components/ui/buttons/AuthServiceButtons/AppleButton'
import { FacebookButton } from '../../components/ui/buttons/AuthServiceButtons/FacebookButton'
import { GoogleButton } from '../../components/ui/buttons/AuthServiceButtons/GoogleButton'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { ModalWindow } from '../../components/ui/modal/Modal'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { UserService } from '../../services/User.service'
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
	const [loading, setLoading] = React.useState(false)

	const transferToLogin = () => {
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

	const serverErrors = {
		email: [
			{
				errorName: 'EMAIL_EXISTS',
				errorMessage: language.EMAIL_EXISTS,
			},
		],
		username: [
			{
				errorName: 'USERNAME_EXISTS',
				errorMessage: language.USERNAME_EXISTS,
			},
		],
		password: [
			{
				errorName: 'PASSWORD_LESS_THAN_8_CHARS',
				errorMessage: language.PASSWORD_TOO_SHORT,
			},
			{
				errorName: 'PASSWORD_DOESNT_CONTAIN_UPPERCASE_LETTER',
				errorMessage: language.PASSWORD_NO_UPPERCASE,
			},
			{
				errorName: 'PASSWORD_DOESNT_CONTAIN_LOWERCASE_LETTER',
				errorMessage: language.PASSWORD_NO_LOWERCASE,
			},
			{
				errorName: 'PASSWORD_DOESNT_CONTAIN_DIGIT',
				errorMessage: language.PASSWORD_NO_DIGITS,
			},
			{
				errorName: 'PASSWORD_CONTAINS_WHITESPACES',
				errorMessage: language.PASSWORD_CONTAINS_SPACES,
			},
		],
	}

	const fetchErrors = (error: string, setFieldError: any) => {
		if (!serverErrors) {
			return
		}
		Object.keys(serverErrors).forEach(key => {
			const currentServerError = serverErrors[key as keyof typeof serverErrors]

			currentServerError.forEach(currentError => {
				if (error === currentError.errorName) {
					setFieldError(key, currentError.errorMessage)
				}
			})
		})
	}

	const handleSubmit = async (values: FormProps, { setFieldError }: any) => {
		const service = UserService.getInstance()

		setLoading(true)
		try {
			const user = await service.register(
				values.email,
				values.username,
				values.password
			)
			await SecureStore.setItemAsync('accessToken', user.accessToken)
			await SecureStore.setItemAsync('refreshToken', user.refreshToken)
			props.navigation.reset({
				index: 0,
				routes: [{ name: Pages.MAIN_MENU }],
			})
		} catch (error: any) {
			if (error && error.response && error.response.data) {
				fetchErrors(error.response.data, setFieldError)
			}
		} finally {
			setLoading(false)
		}
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
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={styles.form}>
							<View style={[styles.textFields, GlobalStyles.center]}>
								{loading ? (
									<ModalWindow
										isVisible={loading}
										setModalVisible={setLoading}
										element={<ActivityIndicator size='large' color='#0000ff' />}
									/>
								) : (
									<></>
								)}

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
									secureTextEntry={true}
									placeholder={language.PASSWORD}
									handleChange={props.handleChange('password')}
									error={props.errors.password}
								/>
								<TextField
									value={props.values.repeatPassword}
									secureTextEntry={true}
									placeholder={language.REPEAT_PASSWORD}
									handleChange={props.handleChange('repeatPassword')}
									error={props.errors.repeatPassword}
								/>
							</View>
							<View style={[GlobalStyles.center, { bottom: 25 }]}>
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

								<View>
									<Text style={styles.orText}>{language.OR}</Text>
								</View>

								<GoogleButton
									title={language.SIGNUP_WITH_GOOGLE}
									callback={() => {}}
								/>

								<FacebookButton
									title={language.SIGNUP_WITH_FACEBOOK}
									callback={function () {
										throw new Error('Function not implemented.')
									}}
								/>

								{Platform.OS === 'ios' ? (
									<AppleButton
										callback={function () {
											throw new Error('Function not implemented.')
										}}
									/>
								) : null}
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
