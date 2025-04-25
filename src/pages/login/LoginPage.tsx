import * as AppleAuthentication from 'expo-apple-authentication'
import * as Google from 'expo-auth-session/providers/google'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import * as SecureStore from 'expo-secure-store'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import * as Yup from 'yup'
import { AppleButton } from '../../components/ui/buttons/AuthServiceButtons/AppleButton'
import { FacebookButton } from '../../components/ui/buttons/AuthServiceButtons/FacebookButton'
import { GoogleButton } from '../../components/ui/buttons/AuthServiceButtons/GoogleButton'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { PasswordField } from '../../components/ui/fields/PasswordField/PasswordField'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { ModalWindow } from '../../components/ui/modal/Modal'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { UserService } from '../../services/User.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './LoginPage.styles'

export const LoginPage = (props: any) => {
	const language = useStore((state: any) => state.language)
	const [loading, setLoading] = React.useState(false)

	const [_, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
		clientId: Platform.select({
			ios: Constants.expoConfig?.extra?.env?.AUTH?.GOOGLE_IOS_CLIENT_ID,
			android: Constants.expoConfig?.extra?.env?.AUTH?.GOOGLE_ANDROID_CLIENT_ID,
		}),
	})

	React.useEffect(() => {
		if (googleResponse?.type === 'success') {
			const { id_token } = googleResponse.params
			const service = UserService.getInstance()
			service.loginGoogle(id_token, Platform.OS).then(successLogin)
		}
	}, [googleResponse])

	const appleLogin = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			})
		} catch (e) {
			console.log('Apple login error: ', e)
		}
	}

	const validationSchema = Yup.object().shape({
		login: Yup.string().required(language.MISSING_LOGIN),
		password: Yup.string().required(language.MISSING_PASSWORD),
	})

	const transferToSignup = () => {
		props.navigation.replace(Pages.SIGNUP)
	}

	const transferToRecovery = () => {
		props.navigation.replace(Pages.EMAIL_RECOVERY)
	}

	const handleSubmit = async (
		values: { login: string; password: string },
		{ setFieldError }: any
	) => {
		const service = UserService.getInstance()

		setLoading(true)
		try {
			await service
				.login(values.login, values.login, values.password)
				.then(successLogin)
				.catch(error => failLogin(error.response.data, setFieldError))
		} catch (error) {
			console.error('Login failed:', error)
		} finally {
			setLoading(false)
		}
	}

	const successLogin = (user: any) => {
		useStore.setState({ user: user })
		SecureStore.setItem('accessToken', user.accessToken)
		SecureStore.setItem('refreshToken', user.refreshToken)

		if (user.hasPincode) {
			props.navigation.navigate(Pages.PINCODE, {
				isLogin: true,
			})
		} else {
			props.navigation.reset({
				index: 0,
				routes: [{ name: Pages.MAIN_MENU }],
			})
		}
	}

	const failLogin = (error: string, setFieldError: any) => {
		const errors = {
			USER_DOESNT_EXIST: language.USER_DOESNT_EXIST,
			WRONG_PASSWORD: language.PASSWORD_INCORRECT,
		}

		if (error === 'USER_DOESNT_EXIST') {
			setFieldError('login', errors[error as keyof typeof errors])
		} else {
			setFieldError('password', errors[error as keyof typeof errors])
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={GlobalStyles.page}
		>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={GlobalStyles.headerWrapper}>
					<Text style={GlobalStyles.header}>{`${language.LOGIN_PAGE}`}</Text>
				</View>
				<Formik
					initialValues={{ login: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<{ login: string; password: string }>) => (
						<View style={styles.form}>
							{loading ? (
								<ModalWindow
									isVisible={loading}
									setModalVisible={setLoading}
									element={<ActivityIndicator size='large' color='#0000ff' />}
								/>
							) : (
								<></>
							)}

							<View style={[styles.textFields, GlobalStyles.center]}>
								<TextField
									value={props.values.login}
									placeholder={language.LOGIN}
									handleChange={props.handleChange('login')}
									error={props.errors.login}
								/>
								<PasswordField
									value={props.values.password}
									placeholder={language.PASSWORD}
									handleChange={props.handleChange('password')}
									secureTextEntry={true}
									error={props.errors.password}
								/>
								<TouchableOpacity onPress={transferToRecovery}>
									<Text style={styles.forgotPassword}>
										{language.FORGOT_PASSWORD}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={GlobalStyles.center}>
								<MainButton
									title={language.LOGIN}
									variant={Buttons.PRIMARY}
									callback={props.handleSubmit}
								/>
								<MainButton
									title={language.SIGNUP}
									variant={Buttons.SECONDARY}
									callback={transferToSignup}
								/>
								<View>
									<Text style={styles.orText}>{language.OR}</Text>
								</View>

								<GoogleButton
									title={language.SIGNUP_WITH_GOOGLE}
									callback={() => {
										console.log('clicked')
										googlePromptAsync()
									}}
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
		</KeyboardAvoidingView>
	)
}
