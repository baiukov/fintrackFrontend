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
	handleChange?: (value: string) => void
	error?: string
	style?: any
}

export const DropDown = (props: DropDownProps) => {
	const language = useStore((state: any) => state.language)

	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(props.currentValue || null)

	return (
		<View style={{ zIndex: open ? 1000 : 1, position: 'relative' }}>
			<DropDownPicker
				style={[styles.input, props.style]}
				textStyle={styles.text}
				dropDownContainerStyle={styles.container}
				open={open}
				value={value}
				items={props.items}
				setOpen={setOpen}
				setValue={setValue}
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
				onChangeValue={(value: string | null) => {
					props.handleChange && props.handleChange(value || '')
				}}
			/>
			<Text style={styles.error}>{props.error}</Text>
		</View>
	)
}
