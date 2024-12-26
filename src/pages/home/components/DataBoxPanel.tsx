import React from 'react'
import { View } from 'react-native'
import { styles } from '../HomePages.styles'
import { DataBox } from './DataBox'

interface DataBoxPanelProps {
	boxes: {
		leftTop: { title: string; data: string }
		rightTop: { title: string; data: string }
		leftBottom: { title: string; data: string }
		rightBottom: { title: string; data: string }
	}
}

export const DataBoxPanel = (props: DataBoxPanelProps) => {
	return (
		<View style={styles.dataBoxPanel}>
			<DataBox
				title={props.boxes.leftTop.title}
				data={props.boxes.leftTop.data}
				isLeftBorder={true}
			/>
			<DataBox
				title={props.boxes.rightTop.title}
				data={props.boxes.rightTop.data}
				isLeftBorder={false}
			/>
			<DataBox
				title={props.boxes.leftBottom.title}
				data={props.boxes.leftBottom.data}
				isLeftBorder={true}
			/>
			<DataBox
				title={props.boxes.rightBottom.title}
				data={props.boxes.rightBottom.data}
				isLeftBorder={false}
			/>
		</View>
	)
}
