import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Tabs } from '../../components/ui/tabs/Tabs'
import { Pages } from '../../enums/Pages'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './MainMenuPage.styles'
import { Accounts } from './tabs/accounts/Accounts'
import { Assets } from './tabs/assets/Assets'

export const MainMenuPage = (props: any) => {
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

	const transferToSettings = () => {
		console.log('Pressed')
		props.navigation.navigate(
			props.transfers?.settings
				? props.transfers.settings
				: Pages.USER_ACCOUNT_SETTNGS
		)
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
					<View style={styles.topMenu}>
					<Pressable
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
						onPress={transferToSettings}>		
						<Ionicons name='settings-sharp' size={32} color='white' />
					</Pressable>
				</View>
				</View>
				<Tabs style={{ width: '60%' }} tabs={tabs} callback={handleChange} />
			</LinearGradient>
		</View>
	)
}
