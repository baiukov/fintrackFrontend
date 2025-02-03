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
import { Asset } from '../../../model/ui/Asset'
import { AssetService } from '../../../services/Asset.service'
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
	const user = useStore((state: any) => state.user)

	const basises = Object.values(DepreciationBasis).map(basis => {
		return { label: basis, value: basis }
	})

	const [assetForm, setAssetForm] = React.useState(props.route.params?.assetForm 
		|| {} as Asset)

	const validationSchema = Yup.object().shape({
		basis: Yup.string().required(language.MISSING_BASIS),
		startDate: Yup.date().required(language.MISSING_START_DATE),
		endDate: Yup.date().required(language.MISSING_END_DATE),
	})

	const handleSubmit = (values: FormProps) => {
		const updatedForm = {
			...assetForm,
			depreciationBasis: values.basis,
			startDate: values.startDate,
			endDate: values.endDate,
		}
		setAssetForm(updatedForm)
		console.log(updatedForm)

		const service = AssetService.getInstance()
		service.add(
			user.id,
			updatedForm.name,
			updatedForm.type,
			updatedForm.account.id,
			updatedForm.acquisitionPrice,
			updatedForm.deprecitationPrice,
			updatedForm.startDate,
			updatedForm.endDate,
			updatedForm.emoji,
		)

		setTimeout(() => {
			props.navigation.replace(Pages.MAIN_MENU, {
				assetForm: assetForm,
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
						basis: assetForm.deprecitationPrice || null,
						startDate: assetForm.startDate || new Date(),
						endDate: assetForm.endDate || new Date(),
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
									title={language.ACQUISITION_DATE}
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
									title={language.DEPRECIATION_DATE}
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
									title={language.SAVE}
									variant={Buttons.PRIMARY}
									callback={props.submitForm}
								/>
								<MainButton
									title={language.DELETE}
									variant={Buttons.SECONDARY}
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
