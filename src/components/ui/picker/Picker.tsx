import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import EmojiPicker from 'rn-emoji-keyboard'
import { useStore } from '../../../storage/store'
import { styles } from './Picker.styles'

export interface PickerProps {
	style: string
	data?: any
	onSelect: (id: string) => any
	selectedId?: string
	title?: string
	itemFill?: string
	error?: string
}

export interface AvailablePickers {
	emoji: any
}

export const Picker = (props: PickerProps) => {
	const language = useStore((state: any) => state.language)

	const availablePickersShownElements: AvailablePickers = {
		emoji: (id: string) => <Text>{id}</Text>,
	}

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
	const [modalVisible, setModalVisible] = useState(false)

	const availablePickersModalElements: AvailablePickers = {
		emoji: (
			<EmojiPicker
				onEmojiSelected={(emoji: any) => {
					setShownElement(
						availablePickersShownElements[
							props.style as keyof AvailablePickers
						](emoji.emoji)
					)
					props.onSelect(emoji.emoji)
					setModalVisible(false)
				}}
				onClose={() => setModalVisible(false)}
				open={modalVisible}
				categoryPosition='top'
				enableSearchBar
			/>
		),
	}

	return (
		<View>
			<TouchableOpacity
				style={styles.input}
				onPress={() => setModalVisible(true)}
			>
				{shownElement}

				<Ionicons name='chevron-down' size={24} color='white' />
			</TouchableOpacity>
			<Text style={styles.error}>{props.error}</Text>
			{modalVisible
				? availablePickersModalElements[
						props.style as keyof typeof availablePickersModalElements
				  ]
				: null}
		</View>
	)
}
