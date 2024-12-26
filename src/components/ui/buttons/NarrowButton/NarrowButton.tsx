import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from './NarrowButton.styles'

export interface NarrowButtonProps {
	title?: string
	onPress?: () => void
}

export const NarrowButton = (props: NarrowButtonProps) => {
	return (
		<TouchableOpacity style={styles.input} onPress={props.onPress}>
			<Text style={styles.text}>{props.title}</Text>
		</TouchableOpacity>
	)
}
