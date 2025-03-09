import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { List } from '../../../components/ui/list/List'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Account } from '../../../model/Account'
import { Group } from '../../../model/ui/Group'
import { GroupService } from '../../../services/Group.service'
import { UserService } from '../../../services/User.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface GroupEditorProps {
	navigation: any
	route: any
	groupFrom: Group | undefined
}

interface FormProps {
	users: User[]
}

interface User {
	id: string
	name: string
}

export const GroupEditorPage3 = (props: GroupEditorProps) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const [options, setOptions] = React.useState(
		[] as { key: string; label: string }[]
	)
	const [searchValue, setSeatchValue] = React.useState('')
	const [groupForm, setGroupForm] = React.useState(
		props.route.params?.groupForm || { name: '', accounts: [], users: [] }
	)

	const formatUsers = (users: User[]) => {
		return users?.map((currentUser: any) => {
			if (currentUser && user.id !== currentUser?.id) {
				return { id: currentUser.id, name: currentUser.userName }
			}
		})
	}

	const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])

	React.useEffect(() => {
		if (groupForm.users) {
			const formattedUsers = formatUsers(groupForm.users)
			if (formattedUsers) {
				formattedUsers.filter(user => user !== undefined)
				if (formattedUsers.length !== 0) {
					setSelectedUsers(formattedUsers as User[])
				}
			}
		}
	}, [groupForm.users])

	const handleSubmit = (values: FormProps) => {
		const newlySelectedUsers = selectedUsers.slice()
		const updatedGroupForm = { ...groupForm, users: newlySelectedUsers }
		setGroupForm(updatedGroupForm)

		const service = GroupService.getInstance()

		if (props.route.params?.isEdit) {
			service.update(
				groupForm.id,
				updatedGroupForm.name,
				user.id,
				newlySelectedUsers.map((user: User) => user?.id),
				updatedGroupForm.accounts.map((account: Account) => account?.id)
			)
		} else {
			service.add(
				null,
				updatedGroupForm.name,
				user.id,
				newlySelectedUsers.map((user: User) => user.id),
				updatedGroupForm.accounts.map((account: Account) => account.id)
			)
		}

		props.route.params?.setRerender(Math.random() + 1)
		props.navigation.reset({
			index: 0,
			routes: [{ name: Pages.MAIN_MENU }],
		})
	}

	const handleSelectUser = (key: string, label: string) => {
		const alreadySelectedUsers = selectedUsers.slice()
		if (alreadySelectedUsers.find((user: User) => user?.id === key)) {
			return
		}
		alreadySelectedUsers.push({ id: key, name: label })
		setSelectedUsers(alreadySelectedUsers)
	}

	const handleRemoveUser = (key: string, _: string) => {
		const alreadySelectedUsers = selectedUsers.filter(
			(currentUser: User) => currentUser?.id !== key
		)
		setSelectedUsers(alreadySelectedUsers)
	}

	const handleSearchChange = async (text: string) => {
		setSeatchValue(text)
		const service = UserService.getInstance()

		const limit = 5
		const users = await service.fetchByUserName(text, limit)
		const options = [] as { key: string; label: string }[]
		users.forEach((currentUser: User) => {
			if (user.id === currentUser?.id) {
				return
			}
			options.push({ key: currentUser.id, label: currentUser.name })
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
				<KeyboardAwareScrollView extraScrollHeight={10}>
					<View style={GlobalStyles.headerWrapper}>
						<Text style={GlobalStyles.header}>{`${language.EDITOR}`}</Text>
						<Text style={GlobalStyles.subheader}>{`${language.STEP} 3/3`}</Text>
					</View>

					<Formik
						initialValues={{
							users: selectedUsers,
						}}
						onSubmit={handleSubmit}
					>
						{(props: FormikProps<FormProps>) => (
							<View style={GlobalStyles.form}>
								<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
									<List
										placeholder={language.SEARCH}
										onChangeText={handleSearchChange}
										title={language.USERS}
										items={selectedUsers.map((user: User) => {
											if (!user) return
											return {
												key: user.id,
												label: user.name,
												onPress: () => handleRemoveUser(user.id, user.name),
											}
										})}
										options={options}
										value={searchValue}
										onPress={handleSelectUser}
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
				</KeyboardAwareScrollView>
			</LinearGradient>
		</View>
	)
}
