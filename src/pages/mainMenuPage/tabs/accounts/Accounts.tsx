import React from 'react'
import { ScrollView, View } from 'react-native'
import { MenuItem } from '../../../../components/ui/buttons/MenuItem/MenuItem'
import { MenuGroup } from '../../../../components/ui/groups/MenuGroup'
import { Icons } from '../../../../enums/Icons'
import { GlobalStyles } from '../../../../styles/GlobalStyles.styles'

export const Accounts: React.FC = () => {
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
		</View>
	)
}
