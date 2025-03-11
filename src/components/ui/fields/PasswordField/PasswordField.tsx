import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './PasswordField.styles'

export interface TextFieldProps {
	value: string
	placeholder: string
	handleChange: (text: string) => any
	error?: string
	secureTextEntry?: boolean
	maxLength?: number
	keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
	onFocus?: () => void
}

export const PasswordField = (props: TextFieldProps) => {
	const [secureTextEntry, setSecureTextEntry] = React.useState(true)

	return (
		<View>
			<View style={styles.inputWrapper}>
				<TextInput
					value={props.value}
					placeholder={props.placeholder}
					style={styles.input}
					onChangeText={props.handleChange}
					secureTextEntry={secureTextEntry}
					maxLength={props.maxLength}
					placeholderTextColor='#717171'
					keyboardType={props.keyboardType}
					onFocus={props.onFocus}
				/>
				<TouchableOpacity
					style={styles.icon}
					onPress={() => setSecureTextEntry(!secureTextEntry)}
				>
					<Ionicons name='eye-sharp' size={24} color='white' />
				</TouchableOpacity>
			</View>
			{props.error ? (
				<Text style={styles.error}>{props.error}</Text>
			) : undefined}
		</View>
	)
}
