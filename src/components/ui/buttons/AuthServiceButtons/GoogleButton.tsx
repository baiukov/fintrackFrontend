import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { styles } from './AuthServiceButton.style'

export interface ButtonParams {
	title: string
	callback: () => any
}

const GOOGLE_ICON_PATH = '../../../../../assets/icons/google.png'
const APPLE_ICON_PATH = '../../../../../assets/icons/apple.png'

export const GoogleButton = (props: ButtonParams) => {
	return (
		<TouchableOpacity
			style={[styles.button, styles.google]}
			onPress={props.callback}
		>
			<Image
				source={require(GOOGLE_ICON_PATH)}
				style={[styles.icon, styles.googleIcon]}
			></Image>

			<Text style={styles.text}>{props.title}</Text>
		</TouchableOpacity>
	)
}
