import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { List } from '../../../components/ui/list/List'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Group } from '../../../model/ui/Group'
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
	const [options, setOptions] = React.useState([] as { key: string; label: string }[])
	const [searchValue, setSeatchValue] = React.useState('')
	const [selectedUsers, setSelectedUsers] = React.useState([] as User[])

	const groupForm = props.route.params?.groupFrom || new Group(null, null, null)

	const handleSubmit = (values: FormProps) => {
		groupForm.setUserNames(values.userNames)

		props.navigation.replace(Pages.MAIN_MENU, {
			groupForm: groupForm,
		})
	}

	const handleSelectUser = (key: string, label: string) => {
		const alreadySelectedUsers = selectedUsers.slice()
		if (alreadySelectedUsers.find((user: User) => user.id === key)) { 
			return
		}
		alreadySelectedUsers.push({id: key, name: label})
		setSelectedUsers(alreadySelectedUsers)
	}
	
	const handleRemoveUser = (key: string, _: string) => {
		const alreadySelectedUsers = selectedUsers.slice()
		alreadySelectedUsers.find((user: User, index: number) => { 
			if (user.id === key) { 
				alreadySelectedUsers.splice(index, 1)
			}
		})
		setSelectedUsers(alreadySelectedUsers)
	}

	const handleSearchChange = async (text: string) => { 
		setSeatchValue(text)
		const service = UserService.getInstance()

		const limit = 5
		const users = await service.fetchByUserName(text, limit)
		const options = [] as { key: string; label: string }[]
		users.forEach((user: User) => { 
			options.push({ key: user.id, label: user.name })
		})
		console.log(options)
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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 3/3`}</Text>
				</View>

				<Formik
					initialValues={{
						userNames: groupForm.getUserNames(),
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
									items={
									selectedUsers.map((user: User) => {
										return { 
											key: user.id, 
											label: user.name, 
											onPress: () => handleRemoveUser(user.id, user.name) }
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
			</LinearGradient>
		</View>
	)
}
