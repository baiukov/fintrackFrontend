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
import { Currencies } from '../../enums/Currencies'
import { Months } from '../../enums/Months'
import { Category } from '../../model/Category'
import { Transaction } from '../../model/Transaction'
import { TransactionService } from '../../services/Transaction.service'
import { useStore } from '../../storage/store'
import { GlobalStyles } from '../../styles/GlobalStyles.styles'
import { styles } from './Graph.styles'
import { GraphItem } from './GraphItem'

interface GraphProps {}

export const Graph = (props: GraphProps) => {
	const language = useStore((state: any) => state.language)
	const account = useStore((state: any) => state.account)

	const incomeExpenseTabs = [
		{ title: language.INCOME, component: () => <></> },
		{ title: language.EXPENSE, component: () => <></> },
	]

	const [currencySymbol, setCurrencySymbol] = React.useState<string>('')
	const [monthTabs, setMonthTabs] = React.useState<
		{ title: string; component: React.ComponentType }[]
	>([])
	const [yearTabs, setYearTabs] = React.useState<
		{ title: string; component: React.ComponentType }[]
	>([])

	React.useEffect(() => {
		setCurrencySymbol(
			Object.values(Currencies).find(
				currency => currency.name === account.currency
			)?.icon || '$'
		)

		let start: Date = new Date(account.createdAt)
		const end = new Date()
		const monthTabs = []
		const yearTabs = []

		while (start <= end) {
			const monthId = Months[(start.getMonth() + 1) as keyof typeof Months]
			const monthStr = language[monthId]
			monthTabs.push({
				title: `${monthStr} '${start.getFullYear().toString().slice(2)}`,
				component: () => <></>,
			})
			start.setMonth(start.getMonth() + 1)
		}

		start = new Date(account.createdAt)
		while (start <= end) {
			const year = start.getFullYear()
			yearTabs.push({
				title: year.toString(),
				component: () => <></>,
			})
			start.setFullYear(start.getFullYear() + 1)
		}
		setMonthTabs(monthTabs)
		setYearTabs(yearTabs)
	}, [account])

	const [data, setData] = React.useState<{ value: number; color: string }[]>([
		{ value: 1000, color: '#fff' },
	])
	const [total, setTotal] = React.useState(0)
	const [categories, setCategories] = React.useState<
		{ category: Category; total: number }[]
	>([])

	const fetchData = (isIncome: boolean, from?: string, to?: string) => {
		const service = TransactionService.getInstance()

		const handleResponse = (
			response: { category: Category; transactions: Transaction[] }[]
		) => {
			let total = 0
			response.forEach(element => {
				element.transactions.forEach(transaction => {
					total += transaction.amount
				})
			})
			setTotal(total)

			const groupSeries: { value: number; color: string }[] = []
			const colors = [
				'#FF6384',
				'#36A2EB',
				'#FFCE56',
				'#4BC0C0',
				'#9966FF',
				'#FF9F40',
				'#FFCD56',
				'#C9CBCF',
				'#36A2EB',
				'#FF6384',
			]
			let kColor = 0

			let categories: { category: Category; total: number }[] = []

			response.forEach(element => {
				let totalByTransaction = 0
				element.transactions.forEach(transaction => {
					totalByTransaction += transaction.amount
				})

				const value = (totalByTransaction / total) * 1000
				groupSeries.push({
					value: value,
					color: colors[kColor],
				})
				kColor++

				categories.push({
					category: element.category,
					total: totalByTransaction,
				})
			})

			if (groupSeries.length === 0) {
				groupSeries.push({ value: 1000, color: '#fff' })
			}

			setData(groupSeries)

			categories = categories.sort((a, b) => b.total - a.total)
			setCategories(categories)
		}

		if (isIncome) {
			service.getAllIncomes(account.id, from, to).then(response => {
				handleResponse(response)
			})
		} else {
			service.getAllExpenses(account.id, from, to).then(response => {
				handleResponse(response)
			})
		}
	}

	React.useEffect(() => {
		fetchData(true)
	}, [account.id])

	const [typeTab, setTypeTab] = React.useState(language.INCOME)
	const [timeTab, setTimeTab] = React.useState(language.ALL_TIME)

	React.useEffect(() => {
		handleChange()
	}, [typeTab])

	const handleChange = () => {
		const isIncome = typeTab === language.INCOME

		if (timeTab === language.ALL_TIME || timeTab === language.CUSTOM) {
			fetchData(isIncome)
			return
		}

		if (timeTab.length === 4) {
			const start = `01-01-${timeTab} 00:00:00`
			const end = `12-31-${timeTab} 23:59:59`
			fetchData(isIncome, start, end)
			return
		}

		const monthStrId = Object.entries(language).find(
			([_, value]) => value === timeTab.split(' ')[0]
		)?.[0]
		const monthId = Object.entries(Months).find(
			([_, value]) => value === monthStrId
		)?.[0]
		const startStr = `0${monthId}-01-20${timeTab.slice(-2)} 00:00:00`
		const end = new Date(`0${monthId}-01-20${timeTab.slice(-2)}`)
		end.setMonth(end.getMonth() + 1)
		end.setDate(end.getDate() - 1)
		const endStr = `0${
			end.getMonth() + 1
		}-${end.getDate()}-${end.getFullYear()} 23:59:59`
		fetchData(isIncome, startStr, endStr)
	}

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
									callback={(tabName: string) => {
										setTypeTab(tabName)
									}}
								/>
							</View>
						</NavigationContainer>
					</NavigationIndependentTree>
					<NavigationIndependentTree>
						<NavigationContainer>
							<View style={{ height: 70 }}>
								<Tabs
									tabs={[
										...monthTabs,
										...yearTabs,
										{ title: language.ALL_TIME, component: () => <></> },
										{ title: language.CUSTOM, component: () => <></> },
									]}
									style={{
										width: '90%',
										tabBarScrollEnabled: true,
										fontSize: 16,
										itemWidth: 'auto',
										tabBarLabelPadding: 10,
									}}
									callback={(tabName: string) => {
										setTimeTab(tabName)
										handleChange()
									}}
								/>
							</View>
						</NavigationContainer>
					</NavigationIndependentTree>
					<View style={GlobalStyles.center}>
						<PieChart series={data} widthAndHeight={300} cover={0.6} />
					</View>
					<View style={styles.items}>
						<GraphItem
							title={language.TOTAL}
							amount={`${total} ${currencySymbol}`}
						/>

						<View style={styles.innerItems}>
							{categories.map(category => {
								return (
									<GraphItem
										emoji={category.category.icon}
										title={category.category.name}
										amount={`${category.total} ${currencySymbol}`}
									/>
								)
							})}
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	)
}
