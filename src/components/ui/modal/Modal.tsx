import React from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { Buttons } from '../../../enums/Buttons'
import { useStore } from '../../../storage/store'
import { styles } from './Modal.styles'
import { ModalMainButton } from './ModalMainButton/ModalMainButton'

export interface ModalProps {
	isVisible: boolean
	setModalVisible: (isVisible: boolean) => void
	element: JSX.Element
	mainButtonTitle?: string
	onClose?: () => any
	withoutCloseButton?: boolean
}

export const ModalWindow = (props: ModalProps) => {
	const language = useStore((state: any) => state.language)

	return (
		<Modal visible={props.isVisible} transparent={true} animationType='fade'>
			<View style={styles.modalBackground}>
				<View style={styles.modal}>
					{props.element}
					{props.withoutCloseButton ? (
						<TouchableOpacity onPress={() => props.setModalVisible(false)}>
							<ModalMainButton
								title={props.mainButtonTitle || language.CLOSE}
								variant={Buttons.PRIMARY}
								callback={() => {
									props.onClose && props.onClose()
									props.setModalVisible(false)
								}}
							/>
						</TouchableOpacity>
					) : null}
				</View>
			</View>
		</Modal>
	)
}
