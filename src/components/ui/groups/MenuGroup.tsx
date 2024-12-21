import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './MenuGroup.styles'

interface MenuGroupProps {
	title: string
	children: React.ReactNode
}

export const MenuGroup = (props: MenuGroupProps) => {
	return (
		<View>
			<Text style={styles.title}>{props.title}</Text>
			<View style={styles.items}>{props.children}</View>
		</View>
	)
}
