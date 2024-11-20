import React from 'react'
import { Text, View } from 'react-native'
import { MainWrapper } from '../components/main-wrapper/MainWrapper'
import { GlobalStyles } from '../styles/GlobalStyles.styles'

export const MainPage = () => {
	return (
		<View style={GlobalStyles.page}>
			<MainWrapper>
				<Text>31</Text>
			</MainWrapper>
		</View>
	)
}
