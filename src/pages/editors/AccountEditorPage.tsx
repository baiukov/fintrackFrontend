import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { Checkbox } from '../../components/ui/checkbox/Checkbox'
import { TextField } from '../../components/ui/fields/TextField/TextField'
import { Picker } from '../../components/ui/picker/Picker'
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
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<TextField
									value={props.values.title}
									placeholder={language.TITLE}
									handleChange={props.handleChange('title')}
									error={props.errors.title}
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
