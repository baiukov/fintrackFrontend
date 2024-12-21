import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { styles } from './Checkbox.styles'

export interface CheckBoxProps {
	title: string
	description?: string
	isChecked?: boolean
	onPress: (isChecked: string) => void
}

export const Checkbox = (props: CheckBoxProps) => {
	const [checked, setChecked] = React.useState(false)

	return (
		<View style={styles.wrapper}>
			<View>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.description}>{props.description}</Text>
			</View>
			<View style={styles.checkBoxWrapper}>
				<TouchableWithoutFeedback
					style={styles.checkBoxWrapper}
					onPress={() => {
						props.onPress('true')
						setChecked(true)
					}}
				/>
				<TouchableOpacity
					style={[styles.checkMark, { display: checked ? 'flex' : 'none' }]}
					onPress={() => {
						const isChecked = false
						props.onPress('')
						setChecked(isChecked)
					}}
				>
					<Ionicons name='checkmark' size={28} color='white' />
				</TouchableOpacity>
			</View>
		</View>
	)
}
