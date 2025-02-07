import React from 'react'
import { View } from 'react-native'
import { GlobalStyles } from './src/styles/GlobalStyles.styles'
import MainStack from './src/utils/navigate'

export default function App() {
	return (
		<View style={GlobalStyles.page}>
			<MainStack />
		</View>
	)
}
