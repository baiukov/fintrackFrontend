import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Icons } from '../../../../enums/Icons'
import { styles } from './MenuItem.styles'

export interface MenuItemProps {
	icon: Icons | null
	title: string
	alt?: string
	emoji?: string
	callback?: () => any
	iconCallback?: () => any
}

export const MenuItem = (props: MenuItemProps) => {
	const alterImage = props.alt ? props.alt : props.title

	const emptyFuncton = () => {
		return
	}
	const callback = props.callback || emptyFuncton
	const iconCallback = props.iconCallback || emptyFuncton

	const source = props.icon ? props.icon : null
	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={callback}>
				<View style={styles.innerBlock}>
					<View style={{ flexDirection: 'row', gap: 10 }}>
						<Text style={styles.text}>{props.emoji}</Text>
						<Text style={styles.text}>{props.title}</Text>
					</View>
					<TouchableOpacity onPress={iconCallback}>
						<Image
							style={styles.icon}
							source={source ? source : undefined}
							alt={alterImage}
						/>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</View>
	)
}
