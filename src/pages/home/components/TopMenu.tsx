import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from '../HomePages.styles'

export const TopMenu = (props: any) => {
	return (
		<View style={styles.topMenu}>
			<TouchableOpacity>
				<Ionicons name='menu' size={32} color='white' />
			</TouchableOpacity>
			<View style={styles.topLeftMenu}>
				<TouchableOpacity>
					<Ionicons name='settings-sharp' size={32} color='white' />
				</TouchableOpacity>
				<TouchableOpacity>
					<AntDesign name='piechart' size={32} color='white' />
				</TouchableOpacity>
			</View>
		</View>
	)
}
