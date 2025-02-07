import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Icons } from '../../../enums/Icons'
import { styles } from './Checkbox.styles'

export interface CheckBoxProps {
	title: string
	description?: string
	isChecked?: boolean
	onPress: (isChecked: string) => void
}

export const Checkbox = (props: CheckBoxProps) => {
	const [checked, setChecked] = React.useState(props.isChecked || false)

	const icon = Icons.CHECKMARK
	return (
		<View style={styles.wrapper}>
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
					<Image style={styles.icon} source={icon}></Image>
				</TouchableOpacity>
			</View>
			<View>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.description}>{props.description}</Text>
			</View>
		</View>
	)
}
