import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
	SearchField,
	SearchFieldProps,
} from '../fields/SearchField/SearchField'
import { styles } from './List.styles'
import { ListItem } from './ListItem'

export interface ListProps extends SearchFieldProps {
	title: string
	items: (
		| {
				key: string
				label: string
				onPress: (key: string, label: string) => void
		  }
		| undefined
	)[]
}

export const List = (props: ListProps) => {
	return (
		<View style={styles.box}>
			<View>
				<Text style={styles.title}>{props.title}</Text>
				<ScrollView style={styles.itemsList}>
					{props.items.map(item =>
						item ? (
							<ListItem
								itemKey={item.key}
								label={item.label}
								onPress={item.onPress}
							/>
						) : null
					)}
				</ScrollView>
			</View>

			<View style={styles.searchField}>
				<SearchField {...props} />
			</View>
		</View>
	)
}
