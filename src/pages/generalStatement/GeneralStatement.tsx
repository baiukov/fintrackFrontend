import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { DatePicker } from '../../components/ui/datePicker/DatePicker'
import { Buttons } from '../../enums/Buttons'
import { Asset } from '../../model/entities/Asset'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'

export interface GeneralStatementProps {
	navigation: any
	route: any
	asset: Asset | undefined
}

interface FormProps {
	startDate: Date
	endDate: Date
}

export const GeneralStatement = (props: GeneralStatementProps) => {
	const language = useStore((state: any) => state.language)

	const validationSchema = Yup.object().shape({
		startDate: Yup.date().required(language.MISSING_START_DATE),
		endDate: Yup.date().required(language.MISSING_END_DATE),
	})

	const handleSubmit = (values: FormProps) => {}

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={GlobalStyles.headerWrapper}>
					<Text style={GlobalStyles.header}>{`${language.EDITOR}`}</Text>
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 3/3`}</Text>
				</View>

				<Formik
					initialValues={{
						startDate: new Date(),
						endDate: new Date(),
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<DatePicker
									title={language.START_DATE}
									selectedDate={props.values.startDate || new Date()}
									handleChange={(
										_event: DateTimePickerEvent,
										selectedDate: Date | undefined
									) => {
										if (selectedDate) {
											props.setFieldValue('startDate', selectedDate)
										}
									}}
									error={props.errors.startDate as string}
								/>
								<DatePicker
									title={language.END_DATE}
									selectedDate={props.values.endDate || new Date()}
									handleChange={(
										_event: DateTimePickerEvent,
										selectedDate: Date | undefined
									) => {
										if (selectedDate) {
											props.setFieldValue('endDate', selectedDate)
										}
									}}
									error={props.errors.endDate as string}
								/>
							</View>
							<View style={GlobalStyles.center}>
								<MainButton
									title={language.GENERATE}
									variant={Buttons.PRIMARY}
									callback={props.submitForm}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
