import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { MenuItem } from '../../components/ui/buttons/MenuItem/MenuItem'
import { Buttons } from '../../enums/Buttons'
import { Icons } from '../../enums/Icons'
import { Pages } from '../../enums/Pages'
import { Category } from '../../model/Category'
import { CategoryService } from '../../services/Category.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'

export const Categories = (props: any) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const service = CategoryService.getInstance()

	const [categories, setCategories] = useState<Category[]>([])
	const [rerender, setRerender] = useState(0)

	useEffect(() => {
		const fetchData = () => {
			service.getAll(user.id).then(data => {
				setCategories(data)
			})
		}
		fetchData()
	}, [user.id, rerender])

	const transferToCategoryEditor = (category?: Category) => {
		props.navigation.navigate(Pages.CATEGORY_EDITOR, {
			categoryForm: category,
			isEdit: !!category,
			setRerender: setRerender,
		})
	}

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
					{categories.map(category => {
						return (
							<MenuItem
								icon={Icons.EDIT}
								emoji={category.icon}
								title={category.name}
								callback={() => {
									transferToCategoryEditor(category)
								}}
							/>
						)
					})}
				</ScrollView>
				<View style={[GlobalStyles.center, GlobalStyles.bottomMenu]}>
					<MainButton
						title={language.ADD_CATEGORY}
						variant={Buttons.PRIMARY}
						callback={() => {
							transferToCategoryEditor()
						}}
					/>
				</View>
			</LinearGradient>
		</View>
	)
}
