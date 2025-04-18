import { LinearGradient } from 'expo-linear-gradient'
import * as SecureStore from 'expo-secure-store'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { UserService } from '../../services/User.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './AccountRemovePage.styles'

interface AccountRemovePageProps {
	route: any
	navigation: any
}

export const AccountRemovePage = (props: AccountRemovePageProps) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const handleSubmit = async (
		values: { password: string },
		{ setFieldError }: any
	) => {
		const service = UserService.getInstance()
		const userId = user.id

		service.deleteAccount(userId, values.password).then(result => {
			console.log(result)
			if (result === 'WRONG_PASSWORD') {
				setFieldError('password', language.PASSOWRD_INCORRECT)
			} else {
				SecureStore.deleteItemAsync('accessToken')
				SecureStore.deleteItemAsync('refreshToken')
				props.navigation.reset({
					index: 0,
					routes: [{ name: Pages.MAIN }],
				})
			}
		})
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
					<Text style={GlobalStyles.header}>{`${language.PASSWORD}`}</Text>
				</View>
				<Formik
					initialValues={{
						password: '',
					}}
					onSubmit={handleSubmit}
				>
					{(
						props: FormikProps<{
							password: string
						}>
					) => (
						<View style={styles.form}>
							<View style={styles.textFields}>
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
									title={language.DELETE_ACCOUNT}
									variant={Buttons.PRIMARY}
									callback={props.handleSubmit}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
