import React from 'react'
import { ScrollView, View } from 'react-native'
import { MainButton } from '../../../../components/ui/buttons/MainButton/MainButton'
import { MenuItem } from '../../../../components/ui/buttons/MenuItem/MenuItem'
import { MenuGroup } from '../../../../components/ui/groups/MenuGroup'
import { Buttons } from '../../../../enums/Buttons'
import { Icons } from '../../../../enums/Icons'
import { Pages } from '../../../../enums/Pages'
import { useStore } from '../../../../storage/store'
import { GlobalStyles } from '../../../../styles/GlobalStyles.styles'

export const Accounts: React.FC = (props: any) => {
	const language = useStore((state: any) => state.language)

	const transferToAccountEditor = () => {
		props.navigation.navigate(Pages.ACCOUNT_EDITOR)
	}

	return (
		<View style={GlobalStyles.center}>
			<ScrollView>
				<MenuGroup title='Family'>
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
					callback={() => {}}
				/>
			</View>
		</View>
	)
}
