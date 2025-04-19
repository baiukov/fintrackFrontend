import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Pages } from '../../../enums/Pages'
import { styles } from '../HomePages.styles'

export interface TopMenuProps {
	isHidden?: {
		menu?: boolean
		settings?: boolean
		graph?: boolean
	}
	transfers?: {
		menu?: Pages
		settings?: Pages
		graph?: Pages
	}
	navigation: any
}

export const TopMenu = (props: TopMenuProps) => {
	const transferToGraph = () => {
		props.navigation.navigate(
			props.transfers?.graph ? props.transfers.graph : Pages.GRAPH
		)
	}

	const transferToSettings = () => {
		props.navigation.navigate(
			props.transfers?.settings ? props.transfers.settings : Pages.SETTINGS
		)
	}

	const transferToMainMenu = () => {
		props.navigation.replace(
			props.transfers?.menu ? props.transfers.menu : Pages.MAIN_MENU
		)
	}

	return (
		<View style={styles.topMenu}>
			<TouchableOpacity
				onPress={transferToMainMenu}
				style={props.isHidden?.menu ? styles.hidden : null}
			>
				<Ionicons
					name='menu'
					size={32}
					color='white'
					style={props.isHidden?.menu ? styles.hidden : null}
				/>
			</TouchableOpacity>
			<View style={styles.topLeftMenu}>
				<TouchableOpacity
					onPress={transferToSettings}
					style={props.isHidden?.settings ? styles.hidden : null}
				>
					<Ionicons
						name='settings-sharp'
						size={32}
						color='white'
						style={props.isHidden?.settings ? styles.hidden : null}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={transferToGraph}
					style={props.isHidden?.graph ? styles.hidden : null}
				>
					<AntDesign
						name='piechart'
						size={32}
						color='white'
						style={props.isHidden?.graph ? styles.hidden : null}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}
