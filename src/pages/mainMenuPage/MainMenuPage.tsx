import { Tabs, TabsProps } from 'antd'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './MainMenuPage.styles'
import { Accounts } from './tabs/accounts/Accounts'
import { Assets } from './tabs/assets/Assets'

export const MainMenuPage = () => {
	const language = useSelector(
		(state: RootState) => state.language.language
	) as unknown as Record<string, string>

	const items: TabsProps['items'] = [
		{
			key: 'accounts',
			label: language.ACCOUNTS,
			children: <Accounts />,
		},
		{
			key: 'assets',
			label: language.ASSETS,
			children: <Assets />,
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
				<View style={styles.tabsWrapper}>
					<View style={styles.tabs}>
						<Tabs
							defaultActiveKey='1'
							items={items}
							onChange={() => {
							}}
							centered={true}
							tabBarStyle={styles.bar}
						/>
					</View>
				</View>
			</LinearGradient>
		</View>
	)
}
