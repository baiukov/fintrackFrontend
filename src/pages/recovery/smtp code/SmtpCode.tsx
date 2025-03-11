import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { UserService } from '../../../services/User.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'
import { styles } from './SmtpCode.styles'

interface PincodeProps {
	route: any
	navigation: any
}

export const SmtpCode = (props: PincodeProps) => {
	const language = useStore((state: any) => state.language)

	const validationSchema = Yup.object().shape({
		code: Yup.number()
			.typeError(language.PINCODE_NOT_DIGITS)
			.min(100000, language.PINCODE_TOO_SHORT)
			.max(999999, language.PINCODE_TOO_LONG)
			.required(language.MISSING_PINCODE),
	})

	const handleSubmit = async (
		values: { code: string },
		{ setFieldError }: any
	) => {
		const service = UserService.getInstance()
		const login = props.route.params?.login
		await service.verifyRecoveryPincode(login, values.code).then(response => {
			if (response) {
				props.navigation.navigate(Pages.NEW_PASSWORD, {
					login: login,
				})
			} else {
				setFieldError('code', language.WRONG_CODE)
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
					<Text style={GlobalStyles.header}>{`${language.RECOVERY}`}</Text>
				</View>
				<Formik
					initialValues={{
						code: '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(
						props: FormikProps<{
							code: string
						}>
					) => (
						<View style={styles.form}>
							<View style={styles.textFields}>
								<TextField
									value={props.values.code}
									placeholder={language.CODE}
									handleChange={props.handleChange('code')}
									secureTextEntry={true}
									maxLength={6}
									keyboardType={'numeric'}
									error={props.errors.code}
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
		</View>
	)
}
