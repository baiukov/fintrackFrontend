import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MainButton } from '../../components/ui/buttons/MainButton/MainButton'
import { NarrowButton } from '../../components/ui/buttons/NarrowButton/NarrowButton'
import { Checkbox } from '../../components/ui/checkbox/Checkbox'
import { DropDown } from '../../components/ui/dropdowns/dropdown/Dropdown'
import { Buttons } from '../../enums/Buttons'
import { Currencies } from '../../enums/Currencies'
import { Pages } from '../../enums/Pages'
import { Messages } from '../../language/Messages'
import { AccountService } from '../../services/Account.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './Settings.styles'

export const Settings = (props: any) => {
	const [language, setLanguage] = React.useState(
		useStore((state: any) => state.language)
	)
	const [account, setAccount] = React.useState(
		useStore((state: any) => state.account)
	)

	const currencies = Object.values(Currencies).map(currency => {
		return { label: currency.name, value: currency.name }
	})

	const languages = Object.keys(Messages).map(lang => {
		return { label: language[lang], value: lang }
	})

	const transferToCategories = () => {
		props.navigation.navigate(Pages.CATEGORIES)
	}

	const transferToGeneralStatement = () => {
		// props.navigation.navigate(Pages.GENERAL_STATEMENT)

		AccountService.getInstance().getGeneralStatement(
			account.id,
			language.LANGUAGE_NAME
		)
	}

	const transferToSetPincode = () => {
		setTimeout(() => {
			props.navigation.navigate(Pages.PINCODE, {
				isLogin: false,
			})
		}, 0)
	}

	const leave = () => {
		props.navigation.reset({
			index: 0,
			routes: [{ name: Pages.MAIN }],
		})
		useStore.setState({ user: null })
		useStore.setState({ account: null })
	}

	const fetchBankData = () => {
		props.navigation.navigate(Pages.FETCH_BANKS)
	}

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background, GlobalStyles.center]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<ScrollView>
					<View style={GlobalStyles.headerWrapper}>
						<Text style={GlobalStyles.header}>{`${language.SETTINGS}`}</Text>
					</View>
					<DropDown
						placeholder={Currencies.CZK.name}
						items={currencies}
						handleChange={() => {}}
						style={{ zIndex: 100 }}
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
						<NarrowButton
							title={language.GENERATE_GENERAL_STATEMENT}
							onPress={transferToGeneralStatement}
						/>
						<NarrowButton
							title={language.FETCH_BANK_DATA}
							onPress={fetchBankData}
						/>
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
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	)
}
