import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { DropDown } from '../../../components/ui/dropdowns/dropdown/Dropdown'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Picker } from '../../../components/ui/picker/Picker'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Asset } from '../../../model/ui/Asset'
import { AccountService } from '../../../services/Account.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface AssetEditorProps {
	navigation: any
	route: any
	asset: Asset | undefined
}

interface FormProps {
	title: string
	account: string
	emoji: string
}

export const AssetEditorPage1 = (props: AssetEditorProps) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const [shownAccounts, setShownAccounts] = React.useState([] as {label: string, value: string}[])
	const [accounts, setAccounts] = React.useState([] as {id: string, name: string}[])

	React.useEffect(() => {
		const fetchData = async () => {
			const service = AccountService.getInstance()
			const accounts = await service.getAllWhereIsOwner(user.id)
			const formattedAccounts = accounts.map(account => {
				return { label: account.name, value: account.id }
			})
			setShownAccounts(formattedAccounts)
		}
		fetchData()
	}, [user.id])

	const [assetForm, setAssetForm] = React.useState(props.route.params?.accountForm 
		|| {} as Asset)

	const validationSchema = Yup.object().shape({
		title: Yup.string().required(language.MISSING_TITLE),
		account: Yup.string().required(language.MISSING_ACCOUNT),
		emoji: Yup.string().required(language.MISSING_ICON),
	})

	const handleSubmit = (values: FormProps) => {
		const updatedForm = { ...assetForm,
			name: values.title,
			account: { id: values.account, name: values.account },
			emoji: values.emoji,
		}
		setAssetForm(updatedForm)

		setTimeout(() => {
			props.navigation.navigate(Pages.ASSET_EDITOR2, {
				assetForm: updatedForm,
			})
		}, 0)
	}

	const recent = [
		{ emoji: '🚗' },
		{ emoji: '🏠' },
		{ emoji: '🚛' },
		{ emoji: '🏢' },
		{ emoji: '🛳️' },
		{ emoji: '💸' },
		{ emoji: '🦆' },
		{ emoji: '🐓' },
		{ emoji: '🐤' },
		{ emoji: '🐔' },
		{ emoji: '🐰' },
		{ emoji: '🐮' },
		{ emoji: '🐷' },
		{ emoji: '🐱' },
		{ emoji: '🐶' },
		{ emoji: '🤖' },
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
						title: assetForm.name || '',
						account: assetForm.account?.name || '',
						emoji: assetForm.emoji || '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center',
									}}
								/>
								<TextField
									value={props.values.title}
									placeholder={language.TITLE}
									handleChange={props.handleChange('title')}
									error={props.errors.title}
								/>
								<DropDown
									placeholder={language.SELECT_ACCOUNT}
									items={shownAccounts}
									handleChange={props.handleChange('account')}
									error={props.errors.account}
								/>
								<Picker
									style='emoji'
									data={recent}
									title={language.SELECT_ICON}
									onSelect={props.handleChange('emoji')}
									error={props.errors.emoji}
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
