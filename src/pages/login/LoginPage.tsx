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
import { styles } from './LoginPage.styles'

export const LoginPage = (props: any) => {
	const language = useStore((state: any) => state.language)

	const validationSchema = Yup.object().shape({
		login: Yup.string().required(language.MISSING_LOGIN),
		password: Yup.string().required(language.MISSING_PASSWORD),
	})

	const transferToSignup = () => {
		props.navigation.replace(Pages.SIGNUP)
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
					<Text style={GlobalStyles.header}>{`${language.LOGIN_PAGE}`}</Text>
				</View>
				<Formik
					initialValues={{ login: '', password: '' }}
					validationSchema={validationSchema}
					onSubmit={() => {
						props.navigation.navigate(Pages.PINCODE_LOGIN)
					}}
				>
					{(props: FormikProps<{ login: string; password: string }>) => (
						<View style={styles.form}>
							<View style={[styles.textFields, GlobalStyles.center]}>
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
							<View style={GlobalStyles.center}>
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
