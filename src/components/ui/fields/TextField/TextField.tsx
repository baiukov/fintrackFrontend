import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from './TextField.styles'

export interface TextFieldProps {
	value: string
	placeholder: string
	handleChange: (text: string) => any
	error?: string
	secureTextEntry?: boolean
	maxLength?: number
	keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
}

export const TextField = (props: TextFieldProps) => {
	return (
		<View>
			<TextInput
				value={props.value}
				placeholder={props.placeholder}
				style={styles.input}
				onChangeText={props.handleChange}
				secureTextEntry={props.secureTextEntry || false}
				maxLength={props.maxLength}
				placeholderTextColor='#717171'
				keyboardType={props.keyboardType}
			/>
			{props.error ? (
				<Text style={styles.error}>{props.error}</Text>
			) : undefined}
		</View>
	)
}
