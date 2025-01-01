import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { MainButton } from '../../../../components/ui/buttons/MainButton/MainButton'
import { MenuItem } from '../../../../components/ui/buttons/MenuItem/MenuItem'
import { MenuGroup } from '../../../../components/ui/groups/MenuGroup'
import { Buttons } from '../../../../enums/Buttons'
import { Icons } from '../../../../enums/Icons'
import { Pages } from '../../../../enums/Pages'
import { Account } from '../../../../model/Account'
import { AccountService } from '../../../../services/Account.service'
import { useStore } from '../../../../storage/store'
import { GlobalStyles } from '../../../../styles/GlobalStyles.styles'

export const Accounts: React.FC = (props: any) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const [accounts, setAccounts] = React.useState<null | Account[]>(null)

	const fetchData = () => {
		const service = AccountService.getInstance()
		service.retrieveAll(user.id).then(data => {
			setAccounts(data)
		})
	}
	fetchData()

	const transferToAccountEditor = () => {
		props.navigation.navigate(Pages.ACCOUNT_EDITOR)
	}

	const transferToGroupEditor = () => {
		props.navigation.navigate(Pages.GROUP_EDITOR)
	}

	return (
		<View style={GlobalStyles.center}>
			<ScrollView>
				<MenuGroup title='Family'>
					{accounts === null ? (
						<ActivityIndicator
							// style={{ alignSelf: 'flex-start', top: 7, left: 5 }}
							size='large'
							color='white'
						/>
					) : (
						accounts.map(account => {
							return (
								<MenuItem
									icon={Icons.EDIT}
									title={account.name}
									callback={function () {
										throw new Error('Function not implemented.')
									}}
								/>
							)
						})
					)}
					<MenuItem
						icon={Icons.EDIT}
						title={'Account name'}
						callback={() => {
							props.navigation.reset({
								index: 0,
								routes: [{ name: Pages.HOME_PAGE }],
							})
						}}
					/>
					<MenuItem
						icon={Icons.EDIT}
						title={'Account name'}
						callback={function () {
							throw new Error('Function not implemented.')
						}}
					/>
				</MenuGroup>
				<MenuGroup title='Friends'>
					<MenuItem
						icon={Icons.EDIT}
						title={'Account name'}
						callback={function () {
							throw new Error('Function not implemented.')
						}}
					/>
					<MenuItem
						icon={Icons.EDIT}
						title={'Account name'}
						callback={function () {
							throw new Error('Function not implemented.')
						}}
					/>
				</MenuGroup>
			</ScrollView>
			<View style={[GlobalStyles.center, GlobalStyles.bottomMenu]}>
				<MainButton
					title={language.ADD_ACCOUNT}
					variant={Buttons.PRIMARY}
					callback={transferToAccountEditor}
				/>
				<MainButton
					title={language.ADD_GROUP}
					variant={Buttons.SECONDARY}
					callback={transferToGroupEditor}
				/>
			</View>
		</View>
	)
}
