import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './MainWrapper.styles'

export const MainWrapper = () => {
	return (
		<View style={GlobalStyles.page}>
			<LinearGradient colors={['#373F80', '#000000']} style={styles.main}>
				<Text>123</Text>
			</LinearGradient>
		</View>
	)
}
