import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './List.styles'

interface ListItemProps {
	itemKey: string
	label: string
	onPress: (key: string, label: string) => void
}

export const ListItem = (props: ListItemProps) => {
	console.log(props)
	if (!props.label) { return }
	const text =
		props.label.length > 14 ? props.label.substring(0, 14) + '...' : props.label
	return (
		<View style={styles.listItem}>
			<TouchableOpacity
				onPress={() => {
					if (props.onPress) {
						props.onPress(props.itemKey, props.label)
					}
				}}
			>
				<Ionicons name='trash-sharp' size={32} color='gray' />
			</TouchableOpacity>
			<Text style={styles.listItemText}>{text}</Text>
		</View>
	)
}
