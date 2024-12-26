import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { NarrowButton } from '../../components/ui/buttons/NarrowButton/NarrowButton'
import { Checkbox } from '../../components/ui/checkbox/Checkbox'
import { DropDown } from '../../components/ui/dropdowns/dropdown/Dropdown'
import { Currencies } from '../../enums/Currencies'
import { Messages } from '../../language/Messages'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './Settings.styles'

export const Settings = (props: any) => {
	const language = useStore((state: any) => state.language)

	const currencies = Object.values(Currencies).map(currency => {
		return { label: currency, value: currency }
	})

	const languages = Object.keys(Messages).map(lang => {
		return { label: language[lang], value: lang }
	})

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background, GlobalStyles.center]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={GlobalStyles.headerWrapper}>
					<Text style={GlobalStyles.header}>{`${language.SETTINGS}`}</Text>
				</View>
				<DropDown
					placeholder={Currencies.CZK}
					items={currencies}
					handleChange={() => {}}
				/>
				<DropDown
					placeholder={languages[0].label}
					items={languages}
					handleChange={() => {}}
				/>
				<View style={{ gap: 20 }}>
					<NarrowButton title={language.CATEGORIES} onPress={() => {}} />
					<NarrowButton title={language.SET_PINCODE} onPress={() => {}} />
					<NarrowButton
						title={language.GENERATE_GENERAL_STATEMENT}
						onPress={() => {}}
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
				</View>
			</LinearGradient>
		</View>
	)
}
