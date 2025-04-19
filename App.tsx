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
				const savedConsent = await SecureStore.getItemAsync(
					TRACKING_CONSENT_KEY
				)

				if (savedConsent === null) {
					const { status } = await Tracking.requestTrackingPermissionsAsync()
					await SecureStore.setItemAsync(TRACKING_CONSENT_KEY, status)

					if (status === 'granted') {
						// User granted tracking permission
					}
				} else if (savedConsent === 'granted') {
					// User previously granted tracking permission
				}
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
