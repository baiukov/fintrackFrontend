import { LinearGradient } from 'expo-linear-gradient'
import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { NarrowButton } from '../../components/ui/buttons/NarrowButton/NarrowButton'
import { Checkbox } from '../../components/ui/checkbox/Checkbox'
import { DropDown } from '../../components/ui/dropdowns/dropdown/Dropdown'
import { Buttons } from '../../enums/Buttons'
import { Pages } from '../../enums/Pages'
import { Messages } from '../../language/Messages'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './Settings.styles'

export const UserAccountSettings = (props: any) => {
	const [language, setLanguage] = React.useState(
		useStore((state: any) => state.language)
	)

	const languages = Object.keys(Messages).map(lang => {
		return { label: language[lang], value: lang }
	})

	const transferToCategories = () => {
		props.navigation.navigate(Pages.CATEGORIES)
	}

	const transferToSetPincode = () => {
		setTimeout(() => {
			props.navigation.navigate(Pages.PINCODE, {
				isLogin: false,
			})
		}, 0)
	}

	const transferToRemoveAccount = () => {
		props.navigation.navigate(Pages.ACCOUNT_REMOVE_PAGE)
	}

	const leave = () => {
		SecureStore.deleteItemAsync('accessToken')
		SecureStore.deleteItemAsync('refreshToken')
		props.navigation.reset({
			index: 0,
			routes: [{ name: Pages.MAIN }],
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
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={GlobalStyles.headerWrapper}>
						<Text style={GlobalStyles.header}>{`${language.SETTINGS}`}</Text>
					</View>
					<DropDown
						placeholder={language.label}
						items={languages}
						style={{ zIndex: -1 }}
						handleChange={(newValue: string) => {
							setLanguage(Messages[newValue as keyof typeof Messages])
							useStore.setState({
								language: Messages[newValue as keyof typeof Messages],
							})
						}}
					/>
					<View style={{ gap: 20 }}>
						<NarrowButton
							title={language.CATEGORIES}
							onPress={transferToCategories}
						/>
						<NarrowButton
							title={language.SET_PINCODE}
							onPress={transferToSetPincode}
						/>
						<View style={styles.list}>
							<Text style={styles.listTitle}>
								{language.SHOW_ON_THE_MAIN_PAGE}
							</Text>

							<View style={styles.listContent}>
								<View style={{ width: 125 }}>
									<Checkbox
										isChecked={true}
										title={language.TOTAL}
										onPress={() => {}}
									/>
									<Checkbox
										isChecked={true}
										title={language.NET_WORTH}
										onPress={() => {}}
									/>
								</View>
								<View>
									<Checkbox
										isChecked={true}
										title={language.INCOMES}
										onPress={() => {}}
									/>
									<Checkbox
										isChecked={true}
										title={language.EXPENSES}
										onPress={() => {}}
									/>
								</View>
							</View>
						</View>

						<MainButton
							title={language.LEAVE}
							variant={Buttons.SECONDARY}
							callback={leave}
						/>
						<MainButton
							title={language.DELETE_ACCOUNT}
							variant={Buttons.SECONDARY}
							callback={transferToRemoveAccount}
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	)
}
