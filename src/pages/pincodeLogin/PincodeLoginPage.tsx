import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../enums/Buttons'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './PincodeLoginPage.styles'

export const PincodeLoginPage = (props: any) => {
	const language = useStore((state: any) => state.language)

	const validate = (values: { pincode: string }) => {
		const errors: { pincode?: string } = {}

		const digitReg = /^\d+$/

		if (!values.pincode) {
			errors.pincode = language.MISSING_PINCODE
		} else if (values.pincode.length < 4) {
			errors.pincode = language.PINCODE_TOO_SHORT
		} else if (!digitReg.test(values.pincode)) {
			errors.pincode = language.PINCODE_NOT_DIGITS
		}

		return errors
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
					<Text style={GlobalStyles.header}>{`${language.PINCODE}`}</Text>
				</View>
				<Formik
					initialValues={{
						pincode: '',
					}}
					validate={validate}
					onSubmit={() => {}}
				>
					{(
						props: FormikProps<{
							pincode: string
						}>
					) => (
						<View style={styles.form}>
							<View style={styles.textFields}>
								<TextField
									value={props.values.pincode}
									placeholder={language.PINCODE}
									handleChange={props.handleChange('pincode')}
									secureTextEntry={true}
									maxLength={4}
									keyboardType={'numeric'}
									error={props.errors.pincode}
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
