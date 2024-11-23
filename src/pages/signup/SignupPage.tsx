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

export const SignupPage = (props: any) => {
	const language = useSelector(
		(state: RootState) => state.language.language
	) as unknown as Record<string, string>

	function transferToLogin() {
		props.navigation.navigate(Pages.LOGIN)
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
					onSubmit={() => {}}
				>
					{(
						props: FormikProps<{
							email: string
							username: string
							password: string
							repeatPassword: string
						}>
					) => (
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
