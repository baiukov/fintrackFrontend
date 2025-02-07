import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './Graph.styles'

interface GraphItemProps {
	emoji?: string
	title: string
	amount: string
}

export const GraphItem = (props: GraphItemProps) => {
	const title =
		props.title.length > 15 ? props.title.substring(0, 15) + '...' : props.title

	return (
		<View style={styles.itemContainer}>
			<View style={styles.itemTitleContainer}>
				{props.emoji && <Text style={styles.emoji}>{props.emoji}</Text>}
				<Text style={styles.text}>{title}</Text>
			</View>
			<Text style={styles.text}>{props.amount}</Text>
		</View>
	)
}
