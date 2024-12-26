import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './Transaction.styles'

interface TransactionProps {
	emoji: string
	category: string
	description: string | undefined
	amount: string
}

export const Transaction = (props: TransactionProps) => {
	const emoji = '🍔'

	const category =
		props.category.length > 15
			? props.category.substring(0, 15) + '...'
			: props.category

	let description = props.description || ''
	description =
		description.length > 30 ? description.substring(0, 30) + '...' : description

	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.innerContainer}>
				<View>
					<Text>{props.emoji}</Text>
				</View>
				<View style={styles.titleWrapper}>
					<Text style={styles.title}>{category}</Text>
					{description ? (
						<Text style={styles.description}>{description}</Text>
					) : null}
				</View>
			</View>
			<View>
				<Text style={styles.amount}>300$</Text>
			</View>
		</TouchableOpacity>
	)
}
