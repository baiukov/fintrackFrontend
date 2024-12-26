import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SearchField } from '../../components/ui/fields/SearchField/SearchField'
import { MenuGroup } from '../../components/ui/groups/MenuGroup'
import { Tabs } from '../../components/ui/tabs/Tabs'
import { Transaction } from '../../components/ui/transaction/Transaction'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './HomePages.styles'
import { DataBoxPanel } from './components/DataBoxPanel'
import { Title } from './components/Title'
import { TopMenu } from './components/TopMenu'

interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
	const language = useStore((state: any) => state.language)

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
					<TopMenu />

					<Title style={{ top: 100 }} emoji='🏠' title='MY ACCOUNT' />
					<DataBoxPanel
						boxes={{
							leftTop: { title: 'Total', data: '1000$' },
							rightTop: { title: 'Total', data: '1000$' },
							leftBottom: { title: 'Total', data: '1000$' },
							rightBottom: { title: 'Total', data: '1000$' },
						}}
					/>

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
								<View>
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
						<MenuGroup
							style={{ fontSize: 20 }}
							title={'May 2024'}
							children={
								<View>
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
					<TouchableOpacity>
						<FontAwesome name='plus' size={32} color='#3D4CC9' />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
	)
}
