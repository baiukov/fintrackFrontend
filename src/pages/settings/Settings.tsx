import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { NarrowButton } from '../../components/ui/buttons/NarrowButton/NarrowButton'
import { Pages } from '../../enums/Pages'
import { AccountService } from '../../services/Account.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'

export const Settings = (props: any) => {
	const [language, setLanguage] = React.useState(
		useStore((state: any) => state.language)
	)
	const [account, setAccount] = React.useState(
		useStore((state: any) => state.account)
	)

	const transferToGeneralStatement = () => {
		// props.navigation.navigate(Pages.GENERAL_STATEMENT)

		AccountService.getInstance().getGeneralStatement(
			account.id,
			language.LANGUAGE_NAME
		)
	}

	const fetchBankData = () => {
		props.navigation.navigate(Pages.FETCH_BANKS)
	}

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background, GlobalStyles.center]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={GlobalStyles.headerWrapper}>
						<Text style={GlobalStyles.header}>{`${language.SETTINGS}`}</Text>
					</View>
					<View style={{ gap: 20 }}>
						<NarrowButton
							title={language.GENERATE_GENERAL_STATEMENT}
							onPress={transferToGeneralStatement}
						/>
						<NarrowButton
							title={language.FETCH_BANK_DATA}
							onPress={fetchBankData}
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	)
}
