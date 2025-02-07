import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Buttons } from '../../../../enums/Buttons'
import { styles } from './MainButton.styles'

export interface ButtonParams {
	title: string
	variant: Buttons
	callback: () => any
}

export const MainButton = (props: ButtonParams) => {
	const buttonStyles = {
		[Buttons.PRIMARY]: styles.primary,
		[Buttons.SECONDARY]: styles.secondary,
		[Buttons.DISABLED]: styles.primary,
	}

	return (
		<View style={[styles.button, buttonStyles[props.variant]]}>
			<TouchableOpacity onPress={props.callback}>
				<Text style={styles.text}>{props.title}</Text>
			</TouchableOpacity>
		</View>
	)
}
