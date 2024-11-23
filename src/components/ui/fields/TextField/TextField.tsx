import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from './TextField.styles'

export interface TextFieldProps {
	value: string
	placeholder: string
	handleChange: (text: string) => any
	error?: string
}

export const TextField = (props: TextFieldProps) => {
	return (
		<View>
			<TextInput
				value={props.value}
				placeholder={props.placeholder}
				style={styles.input}
				onChangeText={props.handleChange}
			></TextInput>
			{props.error ? <Text style={styles.error}></Text> : undefined}
		</View>
	)
}
