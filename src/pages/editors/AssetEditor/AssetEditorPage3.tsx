import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DatePickerElement } from '../../../components/ui/datePicker/DatePickerElement'
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
	startDate: Date
	endDate: Date
}

export const AssetEditorPage3 = (props: AssetEditorProps) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const basises = Object.values(DepreciationBasis).map(basis => {
		return { label: basis, value: basis }
	})

	const [assetForm, setAssetForm] = React.useState(
		props.route.params?.assetForm || ({} as Asset)
	)

	const validationSchema = Yup.object().shape({
		startDate: Yup.date().required(language.MISSING_START_DATE),
		endDate: Yup.date().required(language.MISSING_END_DATE),
	})

	const service = AssetService.getInstance()

	const handleSubmit = (values: FormProps) => {
		const updatedForm = {
			...assetForm,
			startDate: values.startDate,
			endDate: values.endDate,
		}
		setAssetForm(updatedForm)

		const isEdit = props.route.params?.isEdit || false
		if (isEdit) {
			service.update(
				user.id,
				updatedForm.id,
				updatedForm.name,
				updatedForm.type,
				updatedForm.account.id,
				updatedForm.acquisitionPrice,
				updatedForm.deprecitationPrice,
				updatedForm.startDate,
				updatedForm.endDate,
				updatedForm.emoji
			)
			props.navigation.reset({
				index: 0,
				routes: [{ name: Pages.MAIN_MENU }],
			})
		} else {
			service.add(
				user.id,
				updatedForm.name,
				updatedForm.type,
				updatedForm.account.id,
				updatedForm.acquisitionPrice,
				updatedForm.deprecitationPrice,
				updatedForm.startDate,
				updatedForm.endDate,
				updatedForm.emoji
			)
		}

		setTimeout(() => {
			props.navigation.reset({
				index: 0,
				routes: [{ name: Pages.MAIN_MENU }],
			})
		}, 0)
	}

	const handleDeletion = () => {
		service.delete(assetForm.id, user.id)
		props.route.params?.setRerender(Math.random())
		props.navigation.reset({
			index: 0,
			routes: [{ name: Pages.MAIN_MENU }],
		})
	}

	const startDate = assetForm.startDate
		? new Date(assetForm.startDate)
		: new Date()
	const endDate = assetForm.endDate
		? new Date(assetForm.endDate)
		: new Date(new Date().setFullYear(new Date().getFullYear() + 1))

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
						startDate: startDate,
						endDate: endDate,
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<DatePickerElement
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
								<DatePickerElement
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
									callback={handleDeletion}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
