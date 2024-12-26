import React from 'react'
import { DimensionValue, Text, View } from 'react-native'
import { styles } from './MenuGroup.styles'

interface MenuGroupProps {
	title: string
	children: React.ReactNode
	style?: {
		fontSize?: number
		height?: DimensionValue
	}
}

export const MenuGroup = (props: MenuGroupProps) => {
	return (
		<View>
			<Text style={[styles.title, props.style]}>{props.title}</Text>
			<View style={styles.items}>{props.children}</View>
		</View>
	)
}
