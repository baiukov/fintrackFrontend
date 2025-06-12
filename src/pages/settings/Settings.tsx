import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { NarrowButton } from '../../components/ui/buttons/NarrowButton/NarrowButton'
import { Pages } from '../../enums/Pages'
import { AccountService } from '../../services/Account.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import NotificationService from '../../services/NotificationService'

export const Settings = (props: any) => {
	const [language, setLanguage] = React.useState(
		useStore((state: any) => state.language)
	)
	const [account, setAccount] = React.useState(
		useStore((state: any) => state.account)
	)

	React.useEffect(() => {
		const notificationService = NotificationService.getInstance();
		notificationService.registerForPushNotifications();
	}, []);

	const transferToGeneralStatement = () => {
		AccountService.getInstance().getGeneralStatement(
			account.id,
			language.LANGUAGE_NAME
		)
	}

	const fetchBankData = () => {
		props.navigation.navigate(Pages.FETCH_BANKS)
	}

	const testNotification = async () => {
		const notificationService = NotificationService.getInstance();
		await notificationService.sendLocalNotification(
			'Welcome to FinTrack!',
			'This is a test notification.'
		);
	}

	const enableDailyAnalytics = async () => {
		if (account && account.id) {
			const notificationService = NotificationService.getInstance();
			await notificationService.scheduleDailyAnalytics(account.id);
		}
	}

	const disableDailyNotifications = async () => {
		const notificationService = NotificationService.getInstance();
		await notificationService.cancelAllNotifications();
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
						<NarrowButton
							title="Test Notification"
							onPress={testNotification}
						/>
						<NarrowButton
							title="Enable Daily Analytics (12:00 & 16:41)"
							onPress={enableDailyAnalytics}
						/>
						<NarrowButton
							title="Disable Daily Analytics"
							onPress={disableDailyNotifications}
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	)
}
