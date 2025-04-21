import * as SecureStore from 'expo-secure-store'
import * as Tracking from 'expo-tracking-transparency'
import React from 'react'
import { View } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { GlobalStyles } from './src/styles/GlobalStyles.styles'
import MainStack from './src/utils/navigate'

const TRACKING_CONSENT_KEY = 'user_tracking_consent'

export default function App() {
	enableScreens()
	React.useEffect(() => {
		const checkTrackingConsent = async () => {
			try {
				const { status } = await Tracking.requestTrackingPermissionsAsync()

				if (status === 'granted' || status === 'denied') {
					// User granted tracking permission
					return
				}

				await SecureStore.setItemAsync(TRACKING_CONSENT_KEY, status)
			} catch (error) {
				console.error('Tracking consent error:', error)
			}
		}

		checkTrackingConsent()
	}, [])

	return (
		<View style={GlobalStyles.page}>
			<MainStack />
		</View>
	)
}
