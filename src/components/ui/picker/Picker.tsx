import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker'
import { AccountIcons } from '../../../enums/AccountIcons'
import { useStore } from '../../../storage/store'
import { ModalWindow } from '../modal/Modal'
import { styles } from './Picker.styles'
import { PickItemList } from './pickerModalElements/PickItemList'

export interface PickerProps {
	style: string
	data: any
	onSelect: (id: string) => any
	selectedId?: string
	title?: string
	itemFill?: string
}

export interface AvailablePickers {
	color: any
	items: any
}

export const Picker = (props: PickerProps) => {
	const language = useStore((state: any) => state.language)

	const defaultElement = () => {
		if (props.selectedId) {
			return availablePickersShownElements[
				props.style as keyof AvailablePickers
			](props.selectedId)
		} else {
			return (
				<Text style={styles.text}>
					{props.title || language.SELECT_AN_OPTION}
				</Text>
			)
		}
	}
	const [shownElement, setShownElement] = useState(defaultElement())

	const availablePickersModalElements: AvailablePickers = {
		color: (
			<ColorPicker
				onChange={(color: { hex: string }) => {
					setShownElement(
						availablePickersShownElements[
							props.style as keyof AvailablePickers
						](color.hex)
					)
					props.onSelect(color.hex)
				}}
			>
				<Panel1 />
				<HueSlider />
			</ColorPicker>
		),
		items: (
			<PickItemList
				items={props.data || []}
				onSelect={(id: string) => {
					setModalVisible(false)
					setShownElement(
						availablePickersShownElements[
							props.style as keyof AvailablePickers
						](id)
					)
					props.onSelect(id)
				}}
			/>
		),
	}

	const availablePickersShownElements: AvailablePickers = {
		color: (id: string) => (
			<View
				style={{
					width: 30,
					height: 30,
					backgroundColor: id,
					borderRadius: 999,
					left: 3,
				}}
			/>
		),
		items: (id: string) =>
			AccountIcons[id as keyof typeof AccountIcons]({
				width: 35,
				height: 35,
				color: 'white',
			}),
	}

	const [modalVisible, setModalVisible] = useState(false)

	return (
		<View>
			<TouchableOpacity
				style={styles.input}
				onPress={() => setModalVisible(true)}
			>
				{shownElement}

				<Ionicons name='chevron-down' size={24} color='white' />
			</TouchableOpacity>

			<ModalWindow
				isVisible={modalVisible}
				setModalVisible={setModalVisible}
				element={
					availablePickersModalElements[
						props.style as keyof typeof availablePickersModalElements
					]
				}
			/>
		</View>
	)
}
