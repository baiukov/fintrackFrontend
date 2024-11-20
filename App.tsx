import React from 'react'
import { View } from 'react-native'
import { MainPage } from './src/pages/MainPage'
import { GlobalStyles } from './src/styles/GlobalStyles.styles'

export default function App() {
	return (
		<View style={GlobalStyles.page}>
			<MainPage />
		</View>
	)
}
