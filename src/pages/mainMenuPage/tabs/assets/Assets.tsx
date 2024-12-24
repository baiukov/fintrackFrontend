import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MainButton } from '../../../../components/ui/buttons/MainButton/MainButton'
import { MenuItem } from '../../../../components/ui/buttons/MenuItem/MenuItem'
import { Buttons } from '../../../../enums/Buttons'
import { Icons } from '../../../../enums/Icons'
import { Pages } from '../../../../enums/Pages'
import { useStore } from '../../../../storage/store'
import { GlobalStyles } from '../../../../styles/GlobalStyles.styles'

export const Assets = (props: any) => {
	const transferToAssetEditor = () => {
		props.navigation.navigate(Pages.ASSET_EDITOR)
	}

	const language = useStore((state: any) => state.language)

	return (
		<View style={GlobalStyles.center}>
			<ScrollView>
				<MenuItem
					icon={Icons.EDIT}
					title={'Mercedes S-class 2015'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Mercedes V-class 2015'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Mercedes V-class 2015'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Mercedes V-class 2015'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Mercedes V-class 2015'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
				<MenuItem
					icon={Icons.EDIT}
					title={'Mercedes V-class 2015'}
					callback={function () {
						throw new Error('Function not implemented.')
					}}
				/>
			</ScrollView>
			<View style={[GlobalStyles.center, GlobalStyles.bottomMenu]}>
				<MainButton
					title={language.ADD_ASSET}
					variant={Buttons.PRIMARY}
					callback={transferToAssetEditor}
				/>
			</View>
		</View>
	)
}
