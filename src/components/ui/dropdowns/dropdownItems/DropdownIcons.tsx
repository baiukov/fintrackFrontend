import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AccountIcons } from '../../../../enums/AccountIcons'
import { useStore } from '../../../../storage/store'
import { styles } from './DropdownIcons.style'

export interface DropDownIconsProps {
	items: { label: string; value: string }[]
	placeholder?: string
	currentValue?: string
	handleChange?: (value: string | null) => void
	error?: string
}

export const DropDownIcons = (props: DropDownIconsProps) => {
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
				listItemContainerStyle={styles.itemContainer}
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
				scrollViewProps={{
					contentContainerStyle: {
						flexDirection: 'row',
						flexWrap: 'wrap',
					},
				}}
				listMode='SCROLLVIEW'
				renderListItem={
					({ item }) => (
						<TouchableOpacity>
							{AccountIcons[item.value as keyof typeof AccountIcons]({
								width: 35,
								height: 35,
								color: 'lightgrey',
							})}
						</TouchableOpacity>
					)

					// <TouchableOpacity
					// 	style={styles.customItemContainer}
					// 	onPress={() => {
					// 		// setValue(item.label);
					// 		setOpen(false)
					// 	}}
					// >
					// </TouchableOpacity>
				}
				onChangeValue={props.handleChange || (value => {})}
			/>
			<Text style={styles.error}>{props.error}</Text>
		</View>
	)
}
