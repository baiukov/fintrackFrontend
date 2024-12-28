import {
	NavigationContainer,
	NavigationIndependentTree,
} from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import PieChart from 'react-native-pie-chart'
import { Tabs } from '../../components/ui/tabs/Tabs'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './Graph.styles'
import { GraphItem } from './GraphItem'

interface GraphProps {}

export const Graph = (props: GraphProps) => {
	const language = useStore((state: any) => state.language)

	const incomeExpenseTabs = [
		{ title: language.INCOME, component: () => <></> },
		{ title: language.EXPENSE, component: () => <></> },
	]

	const series = [
		{ value: 430, color: '#fff' },
		{ value: 321, color: '#777' },
	]

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<ScrollView>
					<View style={GlobalStyles.headerWrapper}>
						<Text style={GlobalStyles.header}>{`${language.GRAPH}`}</Text>
					</View>
					<NavigationIndependentTree>
						<NavigationContainer>
							<View style={{ height: 60 }}>
								<Tabs
									style={{ width: '50%', fontSize: 16 }}
									tabs={incomeExpenseTabs}
								/>
							</View>
						</NavigationContainer>
					</NavigationIndependentTree>
					<NavigationIndependentTree>
						<NavigationContainer>
							<View style={{ height: 70 }}>
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
										fontSize: 18,
										itemWidth: 100,
									}}
									callback={() => {}}
								/>
							</View>
						</NavigationContainer>
					</NavigationIndependentTree>
					<View style={GlobalStyles.center}>
						<PieChart series={series} widthAndHeight={300} cover={0.6} />
					</View>
					<View style={styles.items}>
						<GraphItem title='Total' amount='1000$' />

						<View style={styles.innerItems}>
							<GraphItem emoji='💵' title='Total' amount='1000$' />
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	)
}
