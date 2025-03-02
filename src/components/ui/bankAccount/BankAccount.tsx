import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './BankAccount.styles'

interface BankAccountProps {
	name: string
	balance: string
	currency: string
	callBack?: () => void
}

export const BankAccount = (props: BankAccountProps) => {
	let name = props.name || ''
	name = name.length > 20 ? name.substring(0, 20) + '...' : name

	return (
		<TouchableOpacity style={styles.container} onPress={props.callBack}>
			<View style={styles.innerContainer}>
				<View style={styles.titleWrapper}>
					<Text style={styles.title}>{name}</Text>
				</View>
			</View>
			<View>
				<Text style={[styles.amount]}>
					{props.balance + ' ' + props.currency}
				</Text>
			</View>
		</TouchableOpacity>
	)
}
