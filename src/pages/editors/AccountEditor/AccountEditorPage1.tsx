import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { Checkbox } from '../../../components/ui/checkbox/Checkbox'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Picker } from '../../../components/ui/picker/Picker'
import { AccountTypes } from '../../../enums/AccountTypes'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Account } from '../../../model/ui/Account'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface AccountEditorProps {
	navigation: any
	route: any
	accountForm: Account | undefined
}

interface FormProps {
	title: string
	type: AccountTypes | null
	group: string
	emoji: string
	isBusiness: boolean
}

export const AccountEditorPage1 = (props: AccountEditorProps) => {
	const language = useStore((state: any) => state.language)

	const [accountForm, setAccountForm] = React.useState(props.route.params?.accountForm 
		|| {} as Account)


	const validationSchema = Yup.object().shape({
		title: Yup.string().required(language.MISSING_TITLE),
		type: Yup.string()
			.oneOf(Object.values(AccountTypes), language.WRONG_ACCOUNT_TYPE)
			.required(language.MISSING_ACCOUNT_TYPE),
		emoji: Yup.string().required(language.MISSING_ICON),
	})

	const accountTypes = Object.values(AccountTypes).map(type => {
		return { label: type, value: type }
	})

	const handleSubmit = (values: FormProps) => {
		accountForm.name = values.title
		accountForm.type = Object.keys(AccountTypes).find(key => AccountTypes[key as keyof typeof AccountTypes] === values.type) as AccountTypes
		accountForm.emoji = values.emoji
		accountForm.isBusiness = values.isBusiness

		setTimeout(() => {
			props.navigation.navigate(Pages.ACCOUNT_EDITOR2, {
				accountForm: accountForm,
			})
		}, 0)
	}

	const recent = [
		{ emoji: '💵' },
		{ emoji: '💴' },
		{ emoji: '💶' },
		{ emoji: '💷' },
		{ emoji: '💸' },
		{ emoji: '💳' },
		{ emoji: '🧾' },
		{ emoji: '📦' },
		{ emoji: '💼' },
		{ emoji: '📁' },
		{ emoji: '📈' },
		{ emoji: '📊' },
	]

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
						title: accountForm.name || '',
						type: accountForm.type,
						group: accountForm.group || '',
						emoji: accountForm.emoji || '',
						isBusiness: accountForm.isBusiness || false,
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
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
									handleChange={props.handleChange('type')}
									error={props.errors.type}
								/>
								<Picker
									style='emoji'
									data={recent}
									title={language.SELECT_ICON}
									onSelect={props.handleChange('emoji')}
									error={props.errors.emoji}
								/>
								<Checkbox
									title={language.BUSINESS_ACCOUNT}
									onPress={props.handleChange('isBusiness')}
									description={language.BUSINESS_ACCOUNT_DESCRIPTION}
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
