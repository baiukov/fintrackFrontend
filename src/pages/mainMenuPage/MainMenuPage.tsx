import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Tabs } from '../../components/tabs/Tabs'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { Accounts } from './tabs/accounts/Accounts'
import { Assets } from './tabs/assets/Assets'

export const MainMenuPage = () => {
	const language = useStore((state: any) => state.language)
	const [pageName, setPageName] = useState(language.ACCOUNTS)

	const tabs = [
		{ title: 'Accounts', component: Accounts },
		{ title: 'Assets', component: Assets },
	]

	const handleChange = (tabName: string) => {
		const activeTab = tabs.find(
			tab => tab.title.toLowerCase() === tabName.toLowerCase()
		)
		setPageName(activeTab?.title || language.ACCOUNTS)
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
					<Text style={GlobalStyles.header}>{`${pageName}`}</Text>
				</View>
				<Tabs tabs={tabs} callback={handleChange} />
			</LinearGradient>
		</View>
	)
}
