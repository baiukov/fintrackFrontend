import React from 'react'
import { Button, View } from 'react-native'
import { Buttons } from '../../../../enums/Buttons'
import { styles } from './MainButton.styles'

export interface ButtonParams {
	title: string
	variant: Buttons
	callback: () => {}
}

export const MainButton = (props: ButtonParams) => {
	const buttonStyles = {
		[Buttons.PRIMARY]: styles.primary,
		[Buttons.SECONDARY]: styles.secondary,
		[Buttons.DISABLED]: styles.primary,
	}

	return (
		<View style={[styles.button, buttonStyles[props.variant]]}>
			<Button title={props.title} onPress={props.callback}></Button>
		</View>
	)
}
