import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { TinkService } from '../../services/Tinks.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './FetchBank.styles'

export const FetchBank = (props: any) => {
	const user = useStore((state: any) => state.user)

	const [authUrl, setAuthUrl] = React.useState('')

	React.useEffect(() => {
		const service = TinkService.getInstance()
		service.fetchUrl(user.id).then((url: string | undefined) => {
			console.log(url)
			setAuthUrl(url || '')
		})
	})

	return (
		<View style={GlobalStyles.page}>
					<LinearGradient
						colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
						style={[GlobalStyles.background, GlobalStyles.center]}
						start={{ x: -1, y: -1 }}
						end={{ x: 1, y: 1 }}
					>
						<View style={styles.webviewContainer}>
							<WebView 
								source={{ uri: authUrl }} 
								style={styles.webview}
							/>
						</View>
					</LinearGradient>
		</View>
	)

}