import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { styles } from '../HomePages.styles'

interface DataBoxProps {
	title: string
	data: string | null
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

			{props.data === null ? (
				<ActivityIndicator
					style={{ alignSelf: 'flex-start', top: 7, left: 5 }}
					size='small'
					color='white'
				/>
			) : (
				<Text style={styles.dataBoxData}>{props.data}</Text>
			)}
		</View>
	)
}
