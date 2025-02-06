import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { MainButton } from '../../../../components/ui/buttons/MainButton/MainButton'
import { MenuItem } from '../../../../components/ui/buttons/MenuItem/MenuItem'
import { MenuGroup } from '../../../../components/ui/groups/MenuGroup'
import { Buttons } from '../../../../enums/Buttons'
import { Icons } from '../../../../enums/Icons'
import { Pages } from '../../../../enums/Pages'
import { Account } from '../../../../model/Account'
import { Group } from '../../../../model/Group'
import { GroupService } from '../../../../services/Group.service'
import { useStore } from '../../../../storage/store'
import { GlobalStyles } from '../../../../styles/GlobalStyles.styles'

export const Accounts: React.FC = (props: any) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const [groups, setGroups] = React.useState<null | Group[]>(null)

	React.useEffect(() => {
		const fetchData = () => {
			const service = GroupService.getInstance()
			service.getAll(user.id).then(data => {
				setGroups(data)
			})
		}
		fetchData()
	}, [user.id])

	const transferToAccountEditor = (account: Account | null = null) => {
		console.log(account)
		if (!!account) {
			setTimeout(() => {
				props.navigation.navigate(Pages.ACCOUNT_EDITOR, {
					accountForm: account,
					isEdit: true,
				})
			}, 0)
		} else {
			props.navigation.navigate(Pages.ACCOUNT_EDITOR, {
				isEdit: false,
			})
		}
	}

	const transferToGroupEditor = (group?: Group) => {
		if (group) {
			setTimeout(() => {
				props.navigation.navigate(Pages.GROUP_EDITOR, {
					groupForm: group,
					isEdit: !!group,
				})
			}, 0)
		} else {
			props.navigation.navigate(Pages.GROUP_EDITOR)
		}
	}

	const transferToHomePage = (account: Account) => {
		useStore.setState({ account: account })

		props.navigation.replace(Pages.HOME_PAGE)
	}

	return (
		<View style={GlobalStyles.center}>
			<ScrollView>
					{groups === null ? (
						<ActivityIndicator
							size='large'
							color='white'
						/>
					) : (
						groups?.filter(group => group != null).filter(group => group.name).map(group => {
							return (
								<MenuGroup 
									title={group.name}
									callback={() => transferToGroupEditor(group)}
								>
									{group.accounts?.map((account: Account) => {
										return (
											<MenuItem
												icon={Icons.EDIT}
												title={account.name}
												emoji={account.emoji}
												callback={() => transferToHomePage(account)}
												iconCallback={() => transferToAccountEditor(account)}
											/>
										)
									})}
								</MenuGroup>
							)
						})
					)}
			{
				groups?.filter(group => group != null).find(group => group.name === null) ?
					<MenuGroup title={language.OTHERS}>
						{
							groups?.filter(group => group != null)
								.filter(group => !group.name)[0]?.accounts?.map((account: Account) => {
								return (
									<MenuItem
										icon={Icons.EDIT}
										emoji={account.emoji}
										title={account.name}
										callback={() => transferToHomePage(account)}
										iconCallback={() => transferToAccountEditor(account)}
									/>
								)
							})
						}
					</MenuGroup>
					: <></>
			}
			</ScrollView>
			<View style={[GlobalStyles.center, GlobalStyles.bottomMenu]}>
				<MainButton
					title={language.ADD_ACCOUNT}
					variant={Buttons.PRIMARY}
					callback={() => transferToAccountEditor(null)}
				/>
				<MainButton
					title={language.ADD_GROUP}
					variant={Buttons.SECONDARY}
					callback={() => transferToGroupEditor()}
				/>
			</View>
		</View>
	)
}
