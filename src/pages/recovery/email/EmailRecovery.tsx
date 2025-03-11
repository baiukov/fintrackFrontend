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
import { styles } from './EmailRecovery.styles'

export const EmailRecovery = (props: any) => {
	const language = useStore((state: any) => state.language)
	const [loading, setLoading] = React.useState(false)

	const validationSchema = Yup.object().shape({
		login: Yup.string().required(language.MISSING_LOGIN),
	})

	const handleSubmit = async (
		values: { login: string },
		{ setFieldError }: any
	) => {
		const service = UserService.getInstance()

		const errors = {
			USER_DOESNT_EXIST: language.USER_DOESNT_EXIST,
		}

		setLoading(true)
		try {
			await service
				.sendEmailCode(values.login, language.LANGUAGE_NAME || 'en')
				.then(response => {
					console.log
					props.navigation.navigate(Pages.SMTP_CODE, {
						login: values.login,
					})
				})
				.catch(error => {
					const response = error.response.data
					if (response === 'USER_DOESNT_EXIST') {
						setFieldError('login', errors[response as keyof typeof errors])
					} else {
						setFieldError('login', errors[response as keyof typeof errors])
					}
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
					initialValues={{ login: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<{ login: string }>) => (
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
