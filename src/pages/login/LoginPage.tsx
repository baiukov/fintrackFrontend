import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from '../main/MainPage.styles'

export const LoginPage = () => {
	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background, styles.global]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			></LinearGradient>
		</View>
	)
}
