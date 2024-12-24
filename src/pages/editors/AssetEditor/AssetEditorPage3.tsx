import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DatePicker } from '../../../components/ui/datePicker/DatePicker'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { Buttons } from '../../../enums/Buttons'
import { DepreciationBasis } from '../../../enums/DepreciationBasis'
import { Pages } from '../../../enums/Pages'
import { Asset } from '../../../model/entities/Asset'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface AssetEditorProps {
	navigation: any
	route: any
	asset: Asset | undefined
}

interface FormProps {
	basis: keyof typeof DepreciationBasis
	startDate: Date
	endDate: Date
}

export const AssetEditorPage3 = (props: AssetEditorProps) => {
	const language = useStore((state: any) => state.language)

	const basises = Object.values(DepreciationBasis).map(basis => {
		return { label: basis, value: basis }
	})

	const assetForm: Asset =
		props.route.params?.asset ||
		new Asset(null, null, null, null, null, null, null, null, null)

	const validationSchema = Yup.object().shape({
		basis: Yup.string().required(language.MISSING_BASIS),
		startDate: Yup.date().required(language.MISSING_START_DATE),
		endDate: Yup.date().required(language.MISSING_END_DATE),
	})

	const handleSubmit = (values: FormProps) => {
		assetForm.setDepreciationBasis(values.basis)
		assetForm.setStartDate(values.startDate)
		assetForm.setEndDate(values.endDate)

		setTimeout(() => {
			props.navigation.replace(Pages.MAIN_MENU, {
				asset: assetForm,
			})
		}, 0)
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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 3/3`}</Text>
				</View>

				<Formik
					initialValues={{
						basis: assetForm.getDepreciationBasis() || null,
						startDate: assetForm.getStartDate() || null,
						endDate: assetForm.getEndDate() || new Date(),
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<DropDown
									placeholder={language.SELECT_BASIS}
									items={basises}
									handleChange={props.handleChange('basis')}
									error={props.errors.basis}
								/>
								<DatePicker
									title={language.ACQUISITION_PRICE}
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
									title={language.DEPRECIATION_PRICE}
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
