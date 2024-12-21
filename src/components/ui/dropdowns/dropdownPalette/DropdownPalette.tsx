import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker'
import { useStore } from '../../../../storage/store'
import { ModalWindow } from '../../modal/Modal'
import { styles } from './DropdownPalette.style'

export interface DropDownPaletteProps {
	items: { label: string; value: string }[]
	placeholder?: string
	currentValue?: string
	handleChange?: (value: string | null) => void
	error?: string
}

export const DropDownPalette = (props: DropDownPaletteProps) => {
	const language = useStore((state: any) => state.language)

	const [value, setValue] = useState(props.currentValue || null)

	const [items, setItems] = useState(props.items)

	const [modalVisible, setModalVisible] = useState(false)
	const [open, setOpen] = useState(false)

	const [selectedOption, setSelectedOption] = useState(
		<View style={[styles.colorBall]} />
	)

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
					return <></>
				}}
				onChangeValue={props.handleChange || (value => {})}
				onOpen={() => setModalVisible(true)}
			/>
			<Text style={styles.error}>{props.error}</Text>

			<ModalWindow
				isVisible={modalVisible}
				setModalVisible={setModalVisible}
				mainButtonTitle={language.CHOOSE_COLOR}
				onClose={() => {
					setOpen(false)
				}}
				element={
					<ColorPicker style={styles.palette}>
						<Panel1 />
						<HueSlider />
					</ColorPicker>
				}
			/>
		</View>
	)
}
