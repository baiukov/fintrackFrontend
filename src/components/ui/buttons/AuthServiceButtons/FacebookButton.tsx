import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { styles } from './AuthServiceButton.style'

export interface ButtonParams {
	title: string
	callback: () => any
}

const ICON_PATH = '../../../../../assets/icons/facebook.png'

export const FacebookButton = (props: ButtonParams) => {
	return (
		<TouchableOpacity
			style={[styles.button, styles.facebook]}
			onPress={props.callback}
		>
			<Image
				source={require(ICON_PATH)}
				style={[styles.icon, styles.facebookIcon]}
			></Image>

			<Text style={styles.text}>{props.title}</Text>
		</TouchableOpacity>
	)
}
