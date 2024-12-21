import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useStore } from '../../../../storage/store'
import { styles } from './Dropdown.style'

export interface DropDownProps {
	items: { label: string; value: string }[]
	placeholder?: string
	currentValue?: string
	handleChange?: (value: string | null) => void
	error?: string
}

export const DropDown = (props: DropDownProps) => {
	const language = useStore((state: any) => state.language)

	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(props.currentValue || null)

	const [items, setItems] = useState(props.items)

	return (
		<View>
			<DropDownPicker
				style={styles.input}
				textStyle={styles.text}
				dropDownContainerStyle={styles.container}
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				placeholder={props.placeholder || language.SELECT_AN_OPTION}
				ArrowDownIconComponent={() => (
					<Ionicons name='chevron-down' size={24} color='white' />
				)}
				ArrowUpIconComponent={() => (
					<Ionicons name='chevron-up' size={24} color='white' />
				)}
				TickIconComponent={() => (
					<Ionicons name='checkmark' size={24} color='white' />
				)}
				ListEmptyComponent={() => {
					return (
						<Text style={styles.emptyText}>{language.NOTHING_TO_SHOW}</Text>
					)
				}}
				onChangeValue={props.handleChange || (value => {})}
			/>
			<Text style={styles.error}>{props.error}</Text>
		</View>
	)
}
