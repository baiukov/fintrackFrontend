import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { DropDown } from '../../components/ui/dropdowns/dropdown/Dropdown'
import { DropDownIcons } from '../../components/ui/dropdowns/dropdownItems/DropdownIcons'
import { DropDownPalette } from '../../components/ui/dropdowns/dropdownPalette/DropdownPalette'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { AccountIcons } from '../../enums/AccountIcons'
import { AccountTypes } from '../../enums/AccountTypes'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'

export interface AccountEditorProps {
	navigation: any
	title: string
	type: AccountTypes
	icon: string
	color: string
	isBusiness: boolean
}

interface FormProps {
	title: string
	type: AccountTypes
	icon: string
	color: string
	isBusiness: boolean
}

export const AccountEditorPage1 = (props: AccountEditorProps) => {
	const language = useStore((state: any) => state.language)

	const [selectedValue, setSelectedValue] = useState('')

	const accountTypes = Object.values(AccountTypes).map(type => {
		return { label: type, value: type }
	})

	const accountIcons = Object.keys(AccountIcons).map(key => {
		return {
			label: key,
			value: key,
		}
	})

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
						title: props.title || '',
						type: props.type || '',
						icon: props.icon || '',
						color: props.color || '',
						isBusiness: props.isBusiness || false,
					}}
					// validate={validate}
					onSubmit={() => {
						props.navigation.navigate(Pages.MAIN_MENU)
					}}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.textFields, GlobalStyles.center]}>
								<TextField
									value={props.values.title}
									placeholder={language.TITLE}
									handleChange={props.handleChange('title')}
									error={props.errors.title}
								/>
								<DropDown
									placeholder={language.CHOOSE_TYPE}
									items={accountTypes}
									currentValue={props.values.type}
									handleChange={(value: string | null) => {
										value
											? props.handleChange('type')(value)
											: props.handleChange('type')('none')
									}}
									error={props.errors.type}
								/>
								<DropDownIcons items={accountIcons}></DropDownIcons>

								<DropDownPalette items={[]}></DropDownPalette>
							</View>
							<View style={GlobalStyles.center}>
								<MainButton
									title={language.SIGNUP}
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
