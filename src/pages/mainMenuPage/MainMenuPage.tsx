import { Tabs, TabsProps } from 'antd'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { MenuItem } from '../../components/ui/buttons/MenuItem/MenuItem'
import { MenuGroup } from '../../components/ui/groups/MenuGroup'
import { Icons } from '../../enums/Icons'
import { RootState } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { Accounts } from './tabs/accounts/Accounts'
import { Assets } from './tabs/assets/Assets'

export const MainMenuPage = () => {
	const language = useSelector(
		(state: RootState) => state.language.language
	) as unknown as Record<string, string>

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Tab 1',
			children: <Accounts />,
		},
		{
			key: '2',
			label: 'Tab 2',
			children: <Assets />,
		},
		{
			key: '3',
			label: 'Tab 3',
			children: 'Content of Tab Pane 3',
		},
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
					<Text style={GlobalStyles.header}>{`${language.ACCOUNTS}`}</Text>
				</View>
				<Tabs
					defaultActiveKey='1'
					items={items}
					onChange={() => {
						console.log(1)
					}}
					centered={true}
				/>
				<View style={GlobalStyles.center}>
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
				</View>
			</LinearGradient>
		</View>
	)
}
