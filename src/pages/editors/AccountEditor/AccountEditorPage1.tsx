import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { Checkbox } from '../../../components/ui/checkbox/Checkbox'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Picker } from '../../../components/ui/picker/Picker'
import { AccountIcons } from '../../../enums/AccountIcons'
import { AccountTypes } from '../../../enums/AccountTypes'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface AccountEditorProps {
	navigation: any
	title: string | undefined
	type: AccountTypes | undefined
	icon: string | undefined
	color: string | undefined
	isBusiness: boolean | undefined
}

interface FormProps {
	title: string
	type: AccountTypes | undefined
	icon: string
	color: string
	isBusiness: boolean
}

export interface AccountProps {
	title: string | undefined
	type: AccountTypes | undefined
	icon: string | undefined
	color: string | undefined
	isBusiness: boolean | undefined
	initialBalance: number | undefined
	currency: string | undefined
}

export const AccountEditorPage1 = (props: AccountEditorProps) => {
	const language = useStore((state: any) => state.language)

	const accountTypes = Object.values(AccountTypes).map(type => {
		return { label: type, value: type }
	})

	const accountIcons = Object.keys(AccountIcons).map(key => {
		return {
			id: key,
			element: AccountIcons[key as keyof typeof AccountIcons],
		}
	})

	const [selectedColor, setSelectedColor] = useState('white')

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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 1/3`}</Text>
				</View>

				<Formik
					initialValues={{
						title: props.title || '',
						type: props.type || undefined,
						icon: props.icon || '',
						color: props.color || '',
						isBusiness: props.isBusiness || false,
					}}
					// validate={validate}
					onSubmit={values => {
						props.navigation.navigate(Pages.ACCOUNT_EDITOR2, {
							title: values.title,
							type: values.type,
							icon: values.icon,
							color: values.color,
							isBusiness: values.isBusiness,
						})
					}}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<TextField
									value={props.values.title}
									placeholder={language.TITLE}
									handleChange={props.handleChange('title')}
									error={props.errors.title}
								/>
								<DropDown
									placeholder={language.SELECT_ACCOUNT_TYPE}
									items={accountTypes}
								/>
								<Picker
									style='items'
									data={accountIcons}
									title={language.SELECT_ICON}
									onSelect={props.handleChange('icon')}
									itemFill={selectedColor}
								/>
								<Picker
									style='color'
									data={null}
									title={language.SELECT_COLOR}
									onSelect={(color: string) => {
										props.handleChange('color')(color)
										setSelectedColor(color)
									}}
								/>
								<Checkbox
									title={language.BUSINESS_ACCOUNT}
									onPress={props.handleChange('isBusiness')}
									description={language.BUSINESS_ACCOUNT_DESCRIPTION}
								></Checkbox>
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
