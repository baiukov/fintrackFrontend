import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from '../Picker.styles'

export interface PickItemListProps {
	items: { id: string; element: (props: any) => React.JSX.Element }[]
	onSelect: (id: string) => void
}

export const PickItemList = (props: PickItemListProps) => {
	return (
		<View style={styles.pickerItemList}>
			{props.items.map(item => (
				<TouchableOpacity
					key={item.id}
					onPress={() => {
						props.onSelect(item.id)
					}}
				>
					{item.element({ width: 45, height: 45, color: 'white' })}
				</TouchableOpacity>
			))}
		</View>
	)
}
