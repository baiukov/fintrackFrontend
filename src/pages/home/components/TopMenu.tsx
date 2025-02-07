import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Pages } from '../../../enums/Pages'
import { styles } from '../HomePages.styles'

export const TopMenu = (props: { navigation: any }) => {
	const transferToGraph = () => {
		props.navigation.navigate(Pages.GRAPH)
	}

	const transferToSettings = () => {
		props.navigation.navigate(Pages.SETTINGS)
	}

	const transferToMainMenu = () => {
		props.navigation.replace(Pages.MAIN_MENU)
	}

	return (
		<View style={styles.topMenu}>
			<TouchableOpacity onPress={transferToMainMenu}>
				<Ionicons name='menu' size={32} color='white' />
			</TouchableOpacity>
			<View style={styles.topLeftMenu}>
				<TouchableOpacity onPress={transferToSettings}>
					<Ionicons name='settings-sharp' size={32} color='white' />
				</TouchableOpacity>
				<TouchableOpacity onPress={transferToGraph}>
					<AntDesign name='piechart' size={32} color='white' />
				</TouchableOpacity>
			</View>
		</View>
	)
}
