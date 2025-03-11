import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Text,
	View,
} from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { ModalWindow } from '../../../components/ui/modal/Modal'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { UserService } from '../../../services/User.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'
import { styles } from './PasswordRecovery.styles'

export const PasswordRecovery = (props: any) => {
	const language = useStore((state: any) => state.language)
	const [loading, setLoading] = React.useState(false)

	const validationSchema = Yup.object().shape({
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
		repeatPassword: Yup.string()
			.oneOf([Yup.ref('password'), ''], language.PASSWORDS_DONT_MATCH)
			.required(language.MISSING_REPEAT_PASSWORD),
	})

	const serverErrors = {
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

	const handleSubmit = async (
		values: { password: string },
		{ setFieldError }: any
	) => {
		const service = UserService.getInstance()

		setLoading(true)
		try {
			const login = props.route.params?.login
			await service
				.updatePassword(login, values.password)
				.then(data => {
					props.navigation.reset({
						index: 0,
						routes: [{ name: Pages.LOGIN }],
					})
				})
				.catch(error => {
					const response = error.response.data
					fetchErrors(response, setFieldError)
				})
		} catch (error) {
			console.error('Login failed:', error)
		} finally {
			setLoading(false)
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
					<Text style={GlobalStyles.header}>{`${language.RECOVERY}`}</Text>
				</View>
				<Formik
					initialValues={{ password: '', repeatPassword: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(
						props: FormikProps<{ password: string; repeatPassword: string }>
					) => (
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
									value={props.values.password}
									placeholder={language.PASSWORD}
									handleChange={props.handleChange('password')}
									secureTextEntry={true}
									error={props.errors.password}
								/>
								<TextField
									value={props.values.repeatPassword}
									placeholder={language.REPEAT_PASSWORD}
									handleChange={props.handleChange('repeatPassword')}
									secureTextEntry={true}
									error={props.errors.repeatPassword}
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
		</KeyboardAvoidingView>
	)
}
