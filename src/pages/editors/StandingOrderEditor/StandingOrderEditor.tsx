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
import { TransactionService } from '../../../services/Transaction.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface StandingOrderEditorProps {
	navigation: any
	route: any
	standingOrderForm: StandingOrder | undefined
}

interface FormProps {
	frequency: string
	startDate: Date
	endDate: Date | null
	daysForRemind: string
}

export const StandingOrderEditor = (props: StandingOrderEditorProps) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const [standingOrderForm, setStandingOrderForm] = React.useState({} as StandingOrder)
	const transactionId = props.route.params?.transactionId

	const service = TransactionService.getInstance()
	React.useEffect(() => { 
		const fetchData = () => {
			service.getStandingOrder(transactionId).then((response) => {
				if (response.data) {
					setStandingOrderForm(response.data)
				}
			})
		}
		fetchData()
	}, [transactionId])

	const frequencies = Object.values(Frequencies).map(type => {
		return { label: type, value: type }
	})

	const validationSchema = Yup.object().shape({
		frequency: Yup.string().required(language.MISSING_FREQUENCY),
		startDate: Yup.date().required(language.MISSING_START_DATE),
		daysForRemind: Yup.number().integer(),
	})

	const handleSubmit = (values: FormProps) => {
		if (transactionId) {
			if (standingOrderForm.frequency) {
				service.updateStandingOrder(
					user.id,
					transactionId,
					values.frequency || Frequencies.MONTHLY,
					values.startDate,
					values.endDate,
					parseInt(values.daysForRemind)
				)
			} else {
				service.createStandingOrder(
					user.id,
					transactionId,
					values.frequency || Frequencies.MONTHLY,
					values.startDate,
					values.endDate,
					parseInt(values.daysForRemind)
				)
			}
		} else {
			props.navigation.goBack({
				standingOrder: {
					frequency: values.frequency,
					startDate: values.startDate,
					endDate: values.endDate,
					daysForRemind: values.daysForRemind,
				}
			})
		}

		
		props.navigation.goBack()
	}

	const handleDeletion = () => {
		const service = TransactionService.getInstance()
		service.deleteStandingOrder(transactionId)
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
						frequency: standingOrderForm.frequency || Frequencies.MONTHLY,
						startDate: standingOrderForm.startDate || new Date(),
						endDate: standingOrderForm.endDate,
						daysForRemind: standingOrderForm.daysForRemind?.toString() || '',
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
									currentValue={props.values.frequency}
									handleChange={props.handleChange('frequency')}
									error={props.errors.frequency}
								/>

								<DatePicker
									title={language.START_DATE}
									selectedDate={props.values.startDate}
									handleChange={function (
										_: DateTimePickerEvent,
										date?: Date | undefined
									): void {
										props.setFieldValue('startDate', date)
									}}
								/>

								<DatePicker
									title={language.END_DATE}
									selectedDate={props.values.endDate || undefined}
									handleChange={function (
										_: DateTimePickerEvent,
										date?: Date | undefined
									): void {
										props.setFieldValue('endDate', date)
									}}
								/>

								<TextField
									value={props.values.daysForRemind}
									placeholder={language.DAYS_FOR_REMIND}
									handleChange={props.handleChange('daysForRemind')}
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
									title={language.DELETE}
									variant={Buttons.SECONDARY}
									callback={handleDeletion}
								/>
							</View>
						</ScrollView>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
