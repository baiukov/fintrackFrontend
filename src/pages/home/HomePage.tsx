import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SearchField } from '../../components/ui/fields/SearchField/SearchField'
import { MenuGroup } from '../../components/ui/groups/MenuGroup'
import { Tabs } from '../../components/ui/tabs/Tabs'
import { Transaction } from '../../components/ui/transaction/Transaction'
import { Pages } from '../../enums/Pages'
import { AccountService } from '../../services/Account.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './HomePages.styles'
import { DataBoxPanel } from './components/DataBoxPanel'
import { Title } from './components/Title'
import { TopMenu } from './components/TopMenu'

interface HomePageProps {
	navigation: any
	route: any
}

export const HomePage = (props: HomePageProps) => {
	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const transferToEditor = () => {
		props.navigation.navigate(Pages.TRANSACTION_EDITOR)
	}

	const [networth, setNeworth] = React.useState<number | null>(null)

	const fetchData = () => {
		if (!user) return
		const service = AccountService.getInstance()
		service.getNetworth(user.id).then(data => {
			setNeworth(data)
		})
	}
	fetchData()

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
					<TopMenu navigation={props.navigation} />

					<Title style={{ top: 100 }} emoji='🏠' title='MY ACCOUNT' />
					<View style={styles.tabs}>
						<Tabs
							tabs={[
								{ title: 'August 24', component: () => <></> },
								{ title: 'May 24', component: () => <></> },
								{ title: 'July 24', component: () => <></> },
								{ title: 'June 25', component: () => <></> },
								{ title: 'June 26', component: () => <></> },
								{ title: 'June 27', component: () => <></> },
								{ title: 'June 28', component: () => <></> },
								{ title: 'June 29', component: () => <></> },
								{ title: 'June 30', component: () => <></> },
							]}
							style={{
								width: '90%',
								tabBarScrollEnabled: true,
								fontSize: 16,
								itemWidth: 'auto',
								tabBarLabelPadding: 5,
							}}
							callback={() => {}}
						/>
					</View>
					<DataBoxPanel
						boxes={{
							leftTop: { title: language.TOTAL, data: networth },
							rightTop: { title: language.NET_WORTH, data: '1000$' },
							leftBottom: { title: language.INCOMES, data: '1000$' },
							rightBottom: { title: language.EXPENSES, data: '1000$' },
						}}
					/>
					<Title style={{ top: 100 }} title={language.TRANSACTIONS} />
					<View style={styles.searchWrapper}>
						<SearchField
							placeholder={language.SEARCH}
							onChangeText={function (text: string): void {
								throw new Error('Function not implemented.')
							}}
						/>
					</View>
					<View style={[styles.contentWrapper, { height: '30%' }]}>
						<MenuGroup
							style={{ fontSize: 20 }}
							title={'May 2024'}
							children={
								<View style={styles.items}>
									<Transaction
										emoji={'🍔'}
										category={'Food'}
										description={'Burger, rice'}
										amount={'20$'}
									></Transaction>
									<Transaction
										emoji={'🏠'}
										category={'Home'}
										description={''}
										amount={'2000$'}
									></Transaction>
								</View>
							}
						/>
						<MenuGroup
							style={{ fontSize: 20 }}
							title={'May 2024'}
							children={
								<View style={styles.items}>
									<Transaction
										emoji={'🍔'}
										category={'Food'}
										description={'Burger, rice'}
										amount={'20$'}
									></Transaction>
									<Transaction
										emoji={'🍔'}
										category={'Food'}
										description={'Burger, rice'}
										amount={'20$'}
									></Transaction>
									<Transaction
										emoji={'🍔'}
										category={'Food'}
										description={'Burger, rice'}
										amount={'20$'}
									></Transaction>
									<Transaction
										emoji={'🍔'}
										category={'Food'}
										description={'Burger, rice'}
										amount={'20$'}
									></Transaction>
								</View>
							}
						/>
					</View>
				</ScrollView>
				<View style={styles.bottomButton}>
					<TouchableOpacity onPress={transferToEditor}>
						<FontAwesome name='plus' size={32} color='#3D4CC9' />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
	)
}
