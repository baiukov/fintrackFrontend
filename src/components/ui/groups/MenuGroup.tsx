import React from 'react'
import { DimensionValue, Image, Text, TouchableOpacity, View } from 'react-native'
import { Icons } from '../../../enums/Icons'
import { styles } from './MenuGroup.styles'

interface MenuGroupProps {
	title: string
	children: React.ReactNode
	style?: {
		fontSize?: number
		height?: DimensionValue
	}
	withIcon?: boolean
	callback?: () => void
}

export const MenuGroup = (props: MenuGroupProps) => {
	return (
		<View>
			<View style={styles.titleContainer}>
				<Text style={[styles.title, props.style]}>{props.title}</Text>
				<TouchableOpacity
					style={styles.iconContainer}
					onPress={props.callback}>
					{
						props.withIcon ?
						<Image
							style={styles.icon}
							source={Icons.EDIT}
						/> : <></>
					}
				</TouchableOpacity>
			</View>
			<View style={styles.items}>{props.children}</View>
		</View>
	)
}
