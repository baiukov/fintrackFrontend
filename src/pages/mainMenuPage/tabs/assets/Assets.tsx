import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MenuItem } from '../../../../components/ui/buttons/MenuItem/MenuItem'
import { Icons } from '../../../../enums/Icons'
import { GlobalStyles } from '../../../../styles/GlobalStyles.styles'

export const Assets = () => {
	return (
		<View style={GlobalStyles.center}>
			<ScrollView>
				<MenuItem
					icon={Icons.EDIT}
					title={'Asset name'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Asset name'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Asset name'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Asset name'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Asset name'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Asset name'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
			</ScrollView>
		</View>
	)
}
