import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, View } from 'react-native'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './MainPage.styles'

export const MainPage = (props: any) => {
	const transferToLogin = () => {
		props.navigation.navigate(Pages.LOGIN)
	}

	const transferToSignup = () => {
		props.navigation.navigate(Pages.SIGNUP)
	}

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background, GlobalStyles.center]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<Image
					source={require('../../../assets/logo.png')}
					style={styles.logo}
				></Image>

				<MainButton
					variant={Buttons.PRIMARY}
					title='Log in'
					callback={transferToLogin}
				></MainButton>

				<MainButton
					variant={Buttons.SECONDARY}
					title='Sign up'
					callback={transferToSignup}
				></MainButton>
			</LinearGradient>
		</View>
	)
}
