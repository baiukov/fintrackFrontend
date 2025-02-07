import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../HomePages.styles'

interface TitleProps {
	emoji?: string
	title: string
	style?: {
		top?: number
	}
}

export const Title = (props: TitleProps) => {
	const title =
		props.title.length > 15 ? props.title.substring(0, 15) + '...' : props.title

	return (
		<View style={[styles.title, { top: props.style?.top }]}>
			<Text style={styles.titleEmoji}>{props.emoji}</Text>
			<Text style={styles.titleText}>{title}</Text>
		</View>
	)
}
