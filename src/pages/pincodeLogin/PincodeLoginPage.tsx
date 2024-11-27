import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../enums/Buttons'
import { RootState } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './PincodeLoginPage.styles'

export const PincodeLoginPage = (props: any) => {
	const language = useSelector(
		(state: RootState) => state.language.language
	) as unknown as Record<string, string>

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
						pincode: '',
					}}
					onSubmit={() => {}}
				>
					{(
						props: FormikProps<{
							pincode: string
						}>
					) => (
						<View style={styles.form}>
							<Text style={GlobalStyles.header}>{`${language.PINCODE}`}</Text>

							<View style={styles.textFields}>
								<TextField
									value={props.values.pincode}
									placeholder={language.PINCODE}
									handleChange={props.handleChange('pincode')}
									secureTextEntry={true}
									maxLength={4}
									keyboardType={'numeric'}
								/>
							</View>
							<View>
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
