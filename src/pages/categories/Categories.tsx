import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { MenuItem } from '../../components/ui/buttons/MenuItem/MenuItem'
import { Buttons } from '../../enums/Buttons'
import { Icons } from '../../enums/Icons'
import { Pages } from '../../enums/Pages'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'

export const Categories = (props: any) => {
	const transferToCategoryEditor = () => {
		props.navigation.navigate(Pages.CATEGORY_EDITOR)
	}

	const language = useStore((state: any) => state.language)

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background, GlobalStyles.center]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={GlobalStyles.headerWrapper}>
					<Text style={GlobalStyles.header}>{`${language.CATEGORIES}`}</Text>
				</View>
				<ScrollView>
					<MenuItem
						icon={Icons.EDIT}
						title={'Food'}
						callback={function () {
							throw new Error('Function not implemented.')
						}}
					/>
					<MenuItem
						icon={Icons.EDIT}
						title={'Home'}
						callback={function () {
							throw new Error('Function not implemented.')
						}}
					/>
					<MenuItem
						icon={Icons.EDIT}
						title={'Other'}
						callback={function () {
							throw new Error('Function not implemented.')
						}}
					/>
				</ScrollView>
				<View style={[GlobalStyles.center, GlobalStyles.bottomMenu]}>
					<MainButton
						title={language.ADD_CATEGORY}
						variant={Buttons.PRIMARY}
						callback={transferToCategoryEditor}
					/>
				</View>
			</LinearGradient>
		</View>
	)
}
