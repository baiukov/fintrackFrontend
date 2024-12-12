import { Tabs } from '@ant-design/react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
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

	const [pageName, setPageName] = useState(language.ACCOUNTS)

	const tabStyles = {
    '--adm-tabs-font-size': '16px',
    '--adm-tabs-color-item-selected': '#FFFFFF',
    '--adm-tabs-color-item-hover': '#FFFFFF',
    '--adm-tabs-color-item-active': '#FFFFFF',
    '--adm-tabs-color-ink-bar': '#FFFFFF',
    '--adm-tabs-color-item': '#888A94',
    '--adm-tabs-line-height': '2',
    '--adm-tabs-color-line': '#888A94',
    '--adm-tabs-horizontal-item-padding': '0',
    '--adm-tabs-horizontal-item-gutter': '10px',
  } as React.CSSProperties;

	const items = [
		{
			key: 'accounts',
			label: String(language.ACCOUNTS),
			children: <Accounts />,
		},
		{
			key: 'assets',
			label: String(language.ASSETS),
			children: <Assets />,
		},
	]

	const tabs = [
		{ title: 'First Tab' },
		{ title: 'Second Tab' },
		{ title: 'Third Tab' },
	]
	
	const handleChange = (activeKey: Object) => {
		const activeTab = items.find((item) => item.key === activeKey)
		setPageName(activeTab?.label as string || language.ACCOUNTS)
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
					<Text style={GlobalStyles.header}>{pageName}</Text>
				</View>
				<Tabs
					renderTabBar={(tabProps) => (
						<TouchableOpacity
						activeOpacity={0.9}
						key="123"
						style={{
							// width: '30%',
							padding: 6,
						}}
						onPress={() => {}}>
						<Text>
							123
						</Text>
					</TouchableOpacity>
					
					)}
				>
					
				</Tabs>
				<View style={styles.tabsWrapper}>
					<View style={styles.tabs}>
						<Tabs
							onChange={handleChange}
							tabs={tabs}
							renderTabBar={(tabProps) => (
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-evenly',
									}}>
									{tabProps.tabs.map((tab, i) => (
										<TouchableOpacity
											activeOpacity={0.9}
											key={tab.key || i}
											style={{
												// width: '30%',
												padding: 6,
											}}
											onPress={() => {
												const { goToTab, onTabClick } = tabProps
												// tslint:disable-next-line:no-unused-expression
												onTabClick && onTabClick(tab, i)
												// tslint:disable-next-line:no-unused-expression
												goToTab && goToTab(i)
											}}>
											<Text
												style={{
													color: tabProps.activeTab === i ? 'green' : '#333333',
												}}>
												{tab.title}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							)}
						>
							
						</Tabs>
					</View>
				</View>
			</LinearGradient>
		</View>
	)
}
