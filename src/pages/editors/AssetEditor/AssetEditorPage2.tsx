import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../../enums/Buttons'
import { Currencies } from '../../../enums/Currencies'
import { Pages } from '../../../enums/Pages'
import { Asset } from '../../../model/ui/Asset'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface AccountEditorProps {
	navigation: any
	route: any
	asset: Asset | undefined
}

interface FormProps {
	acquisitionPrice: string
	deprecitationPrice: string
	currency: keyof typeof Currencies
}

export const AssetEditorPage2 = (props: AccountEditorProps) => {
	const language = useStore((state: any) => state.language)

	const currencies = Object.values(Currencies).map(currency => {
		return { label: currency, value: currency }
	})

	const [assetForm, setAccountForm] = React.useState(props.route.params?.assetForm 
		|| {} as Asset)

	const handleSubmit = (values: FormProps) => {
		const updatedForm = { ...assetForm, 
			acquisitionPrice: parseFloat(values.acquisitionPrice), 
			deprecitationPrice: parseFloat(values.deprecitationPrice), 
			currency: values.currency 
		}
		setAccountForm(updatedForm)

		setTimeout(() => {
			props.navigation.navigate(Pages.ASSET_EDITOR3, {
				assetForm: updatedForm,
			})
		}, 0)
	}

	const validationSchema = Yup.object().shape({
		acquisitionPrice: Yup.number()
			.typeError(language.MUST_BE_A_NUMBER)
			.positive(language.MUST_BE_POSITIVE)
			.required(language.MISSING_ACQUISITION_PRICE),
		deprecitationPrice: Yup.number()
			.typeError(language.MUST_BE_A_NUMBER)
			.positive(language.MUST_BE_POSITIVE)
			.required(language.MISSING_DEPRECIATION_PRICE),
		currency: Yup.string().required(language.MISSING_CURRENCY),
	})

	const acquisitionPrice = assetForm.acquisitionPrice
	const deprecitationPrice = assetForm.deprecitationPrice
	const showAcquisitionPriceError =
		acquisitionPrice === 0 ? '' : acquisitionPrice
	const shownDepreciationPriceError =
		deprecitationPrice === 0 ? '' : deprecitationPrice

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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 2/3`}</Text>
				</View>

				<Formik
					initialValues={{
						acquisitionPrice: showAcquisitionPriceError || '',
						deprecitationPrice: shownDepreciationPriceError || '',
						currency: assetForm.currency || '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<TextField
									value={props.values.acquisitionPrice}
									keyboardType={'numeric'}
									maxLength={15}
									placeholder={language.ACQUISITION_PRICE}
									handleChange={props.handleChange('acquisitionPrice')}
									error={props.errors.acquisitionPrice}
								/>
								<TextField
									value={props.values.deprecitationPrice}
									keyboardType={'numeric'}
									maxLength={15}
									placeholder={language.DEPRECIATION_PRICE}
									handleChange={props.handleChange('deprecitationPrice')}
									error={props.errors.deprecitationPrice}
								/>
								<DropDown
									placeholder={language.SELECT_CURRENCY}
									items={currencies}
									handleChange={props.handleChange('currency')}
									error={props.errors.currency}
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
