import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './DatePicker.style'

export interface DatePickerProps {
	title: string
	selectedDate: Date
	handleChange: (event: DateTimePickerEvent, date?: Date) => void
	error?: any
}

export const DatePickerElement = (props: DatePickerProps) => {
	return (
		<View>
			<View style={styles.input}>
				<Text style={styles.text}>{props.title}</Text>
				{props.selectedDate ? (
					<DateTimePicker
						value={props.selectedDate || new Date()}
						mode='date'
						display='default'
						onChange={props.handleChange}
					/>
				) : null}
			</View>
			<Text style={styles.error}>{props.error}</Text>
		</View>
	)
}
