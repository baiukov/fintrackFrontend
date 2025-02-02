import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { styles } from './SearchField.styles'

export interface SearchFieldProps {
	placeholder: string
	onChangeText: (text: string) => void
	value?: string
	options?: { label: string; key: string }[]
	onPress?: (key: string, label: string) => void
}

export const SearchField = (props: SearchFieldProps) => {
	const emptyFunction = (key: string, label: string) => {}

	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder={props.placeholder}
				onChangeText={props.onChangeText}
				value={props.value}
			/>
			<ScrollView style={styles.options}>
				{props.options?.map(option => (
					<TouchableOpacity
						key={option.key}
						onPress={() => {
							props.onPress ? props.onPress(option.key, option.label) : emptyFunction(option.key, option.label)
						}}
					>
						<View style={styles.option}>
							<Text style={styles.optionText}>{option.label}</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	)
}
