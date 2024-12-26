import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../HomePages.styles'

interface DataBoxProps {
	title: string
	data: string
	isLeftBorder?: boolean
}

export const DataBox = (props: DataBoxProps) => {
	return (
		<View
			style={[
				styles.dataBox,
				props.isLeftBorder ? styles.leftBorder : styles.rightBorder,
			]}
		>
			<Text style={styles.dataBoxTitle}>{props.title}</Text>
			<Text style={styles.dataBoxData}>{props.data}</Text>
		</View>
	)
}
