import React from 'react'
import { View } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { GlobalStyles } from './src/styles/GlobalStyles.styles'
import MainStack from './src/utils/navigate'

const TRACKING_CONSENT_KEY = 'user_tracking_consent'

export default function App() {
	enableScreens()

	return (
		<View style={GlobalStyles.page}>
			<MainStack />
		</View>
	)
}
