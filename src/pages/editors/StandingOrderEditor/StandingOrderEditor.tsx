import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DatePicker } from '../../../components/ui/datePicker/DatePicker'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../../enums/Buttons'
import { Frequencies } from '../../../enums/Frequencies'
import { StandingOrder } from '../../../model/ui/StandingOrder'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface StandingOrderEditorProps {
	navigation: any
	route: any
	standingOrderForm: StandingOrder | undefined
}

interface FormProps {
	frequency: keyof typeof Frequencies | null
	startDate: Date
	endDate: Date | null
	daysForRemind: string
}

export const StandingOrderEditor = (props: StandingOrderEditorProps) => {
	const language = useStore((state: any) => state.language)

	const standingOrderForm =
		props.route.params?.standingOrderForm ||
		new StandingOrder(null, null, null, null)

	const frequencies = Object.values(Frequencies).map(type => {
		return { label: type, value: type }
	})

	const validationSchema = Yup.object().shape({
		frequency: Yup.string().required(language.MISSING_FREQUENCY),
		startDate: Yup.date().required(language.MISSING_START_DATE),
	})

	const handleSubmit = (values: FormProps) => {
		props.navigation.goBack()
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
					<Text style={GlobalStyles.header}>{`${language.EDITOR}`}</Text>
				</View>

				<Formik
					initialValues={{
						frequency: standingOrderForm.getFrequency() || Frequencies.MONTHLY,
						startDate: standingOrderForm.getStartDate() || new Date(),
						endDate: standingOrderForm.getEndDate(),
						daysForRemind: standingOrderForm.getDaysForRemind(),
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<ScrollView style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<DropDown
									placeholder={language.CHOOSE_FREQUENCY}
									items={frequencies}
									handleChange={props.handleChange('frequency')}
									error={props.errors.frequency}
								/>

								<DatePicker
									title={language.START_DATE}
									selectedDate={props.values.startDate}
									handleChange={function (
										event: DateTimePickerEvent,
										date?: Date | undefined
									): void {
										throw new Error('Function not implemented.')
									}}
								/>

								<DatePicker
									title={language.END_DATE}
									selectedDate={props.values.endDate}
									handleChange={function (
										event: DateTimePickerEvent,
										date?: Date | undefined
									): void {
										throw new Error('Function not implemented.')
									}}
								/>

								<TextField
									value={props.values.daysForRemind}
									placeholder={language.DAYS_FOR_REMIND}
									handleChange={props.handleChange('dayForRemind')}
									error={props.errors.daysForRemind}
								/>
							</View>
							<View style={[GlobalStyles.center, GlobalStyles.bottomMenu]}>
								<MainButton
									title={language.SAVE}
									variant={Buttons.PRIMARY}
									callback={props.handleSubmit}
								/>
								<MainButton
									title={language.STANDING_ORDER}
									variant={Buttons.SECONDARY}
									callback={props.handleSubmit}
								/>
							</View>
						</ScrollView>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
