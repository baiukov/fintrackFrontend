import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import EmojiPicker from 'rn-emoji-picker'
import { emojis } from 'rn-emoji-picker/dist/data'
import { useStore } from '../../../storage/store'
import { ModalWindow } from '../modal/Modal'
import { styles } from './Picker.styles'

export interface PickerProps {
	style: string
	data: any
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
		emoji: (
			<View style={{ height: 500 }}>
				<EmojiPicker
					emojis={emojis}
					recent={props.data || []}
					autoFocus={false}
					loading={false}
					darkMode={false}
					perLine={6}
					backgroundColor={'transparent'}
					onSelect={(emoji: any) => {
						setShownElement(
							availablePickersShownElements[
								props.style as keyof AvailablePickers
							](emoji.emoji)
						)
						props.onSelect(emoji.emoji)
						setModalVisible(false)
					}}
					defaultCategory={'objects'}
				/>
			</View>
		),
	}

	const availablePickersShownElements: AvailablePickers = {
		emoji: (id: string) => <Text>{id}</Text>,
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
			<Text style={styles.error}>{props.error}</Text>
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
