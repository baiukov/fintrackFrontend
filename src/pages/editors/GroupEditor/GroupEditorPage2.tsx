import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { List } from '../../../components/ui/list/List'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Group } from '../../../model/ui/Group'
import { AccountService } from '../../../services/Account.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface GroupEditorProps {
	navigation: any
	route: any
	groupForm: Group | undefined
}

interface FormProps {
	accountNames: string[]
}

interface Account {
	id: string
	name: string
}

export const GroupEditorPage2 = (props: GroupEditorProps) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const [groupForm, setGroupForm] = React.useState(props.route.params?.groupForm || { name: '', accounts: [], users: [] })

	const [options, setOptions] = React.useState([] as { key: string; label: string }[])
	const [searchValue, setSeatchValue] = React.useState('')
	const [selectedAccounts, setSelectedAccounts] = React.useState(groupForm.accounts as Account[] || [] as Account[])

	const handleSubmit = (values: FormProps) => {
		const newlySelectedAccounts = selectedAccounts.slice()
		const updatedGroupForm = { ...groupForm, accounts: newlySelectedAccounts }
		setGroupForm(updatedGroupForm)

		setTimeout(() => {
			props.navigation.navigate(Pages.GROUP_EDITOR3, {
				groupForm: updatedGroupForm,
				isEdit: props.route.params?.isEdit,
			})
		}, 0)
	}

	const handleSelectAccount = (key: string, label: string) => {
		const alreadySelectedAccounts = selectedAccounts.slice()
		if (alreadySelectedAccounts.find((account: Account) => account.id === key)) { 
			return
		}
		alreadySelectedAccounts.push({id: key, name: label})
		setSelectedAccounts(alreadySelectedAccounts)
	}
	
	const handleRemoveAccount = (key: string, _: string) => {
		const alreadySelectedAccounts = selectedAccounts.slice()
		alreadySelectedAccounts.find((account: Account, index: number) => { 
			if (account.id === key) { 
				alreadySelectedAccounts.splice(index, 1)
			}
		})
		setSelectedAccounts(alreadySelectedAccounts)
	}

	const handleSearchChange = async (text: string) => { 
		setSeatchValue(text)
		const service = AccountService.getInstance()

		const limit = 5
		const accounts = await service.fetchByUserIdAndAccountName(user.id, text, limit)
		const options = [] as { key: string; label: string }[]
		accounts.forEach((account: Account) => { 
			options.push({ key: account.id, label: account.name })
		})
		setOptions(options)
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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 2/3`}</Text>
				</View>

				<Formik
					initialValues={{
						accountNames: selectedAccounts.map(account => account.name),
					}}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<List
									placeholder={language.SEARCH}
									onChangeText={handleSearchChange}
									title={language.ACCOUNTS}
									items={
										selectedAccounts.map((account: Account) => {
											return { 
												key: account.id,
												label: account.name, 
												onPress: () => handleRemoveAccount(account.id, account.name) }
										})}
									options={options}
									value={searchValue}
									onPress={handleSelectAccount}
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
