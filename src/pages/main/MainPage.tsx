import { LinearGradient } from 'expo-linear-gradient'
import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Image, View } from 'react-native'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { UserService } from '../../services/User.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './MainPage.styles'

export const MainPage = (props: any) => {
	const language = useStore((state: any) => state.language)
	const [accessToken, setAccessToken] = React.useState(
		SecureStore.getItem('accessToken')
	)

	React.useEffect(() => {
		if (accessToken) {
			const service = UserService.getInstance()
			service.loginByToken(accessToken).then(user => {
				useStore.setState({ user: user })
				props.navigation.reset({
					index: 0,
					routes: [{ name: Pages.MAIN_MENU }],
				})
			})
		}
	}, [accessToken])

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
					title={language.LOGIN}
					callback={transferToLogin}
				/>

				<MainButton
					variant={Buttons.SECONDARY}
					title={language.SIGNUP}
					callback={transferToSignup}
				/>
			</LinearGradient>
		</View>
	)
}
