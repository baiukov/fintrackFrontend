import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { styles } from './SearchField.styles'

export interface SearchFieldProps {
	placeholder: string
	onChangeText: (text: string) => void
	value?: string
	options?: { label: string; key: string }[]
	onPress?: ({ label, key }: { label: string; key: string }) => void
}

export const SearchField = (props: SearchFieldProps) => {
	const [search, setSearch] = useState(props.value || '')
	const [options, setOptions] = useState(props.options || [])

	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder={props.placeholder}
				onChangeText={setSearch}
				value={search}
			/>
			<ScrollView style={styles.options}>
				{options.map(option => (
					<TouchableOpacity
						key={option.key}
						onPress={() => {
							props.onPress &&
								props.onPress({ key: option.key, label: option.label })
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
