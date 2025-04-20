import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SearchField } from '../../components/ui/fields/SearchField/SearchField'
import { MenuGroup } from '../../components/ui/groups/MenuGroup'
import { Tabs } from '../../components/ui/tabs/Tabs'
import { Transaction } from '../../components/ui/transaction/Transaction'
import { Currencies } from '../../enums/Currencies'
import { Months } from '../../enums/Months'
import { Pages } from '../../enums/Pages'
import { TransactionTypes } from '../../enums/TransactionTypes'
import { Transaction as TransactionDto } from '../../model/Transaction'
import { AccountService } from '../../services/Account.service'
import { TransactionService } from '../../services/Transaction.service'
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

interface TransactionGroup {
	title: string
	transactions: TransactionDto[]
}

export const HomePage = (props: HomePageProps) => {
	const language = useStore((state: any) => state.language)
	const account = useStore((state: any) => state.account)

	const transferToEditor = (transaction?: TransactionDto | null) => {
		const transactionForm = transaction

		setTimeout(() => {
			props.navigation.navigate(Pages.TRANSACTION_EDITOR, {
				transactionForm: transactionForm,
				isEdit: !!transactionForm,
				setRerender: setRerender,
			})
		}, 0)
	}

	const [networth, setNeworth] = React.useState<number | null>(null)
	const [incomes, setIncomes] = React.useState<number | null>(null)
	const [expenses, setExpenses] = React.useState<number | null>(null)
	const [total, setTotal] = React.useState<number | null>(null)
	const [transactionGroups, setTransactionGroups] = React.useState<
		TransactionGroup[]
	>([])
	const [shownTransactionGroups, setShownTransactionGroups] = React.useState<
		TransactionGroup[]
	>([])
	const [filter, setFilter] = React.useState<string>('')
	const [currencySymbol, setCurrencySymbol] = React.useState<string>('')
	const [monthTabs, setMonthTabs] = React.useState<
		{ title: string; component: React.ComponentType }[]
	>([])
	const [yearTabs, setYearTabs] = React.useState<
		{ title: string; component: React.ComponentType }[]
	>([])
	const [rerender, setRerender] = React.useState<number>(0)

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

	React.useEffect(() => {
		const fetchData = () => {
			const service = TransactionService.getInstance()

			let groups: TransactionGroup[] = []

			service.getAll(account.id).then(data => {
				const sortedTransactions = data
					.map(transaction => ({
						...transaction,
						executionDateTime: new Date(transaction.executionDateTime),
					}))
					.sort(
						(a, b) =>
							new Date(b.executionDateTime).getTime() -
							new Date(a.executionDateTime).getTime()
					)

				sortedTransactions.forEach(transaction => {
					const date = transaction.executionDateTime
					const monthId = date.getMonth() + 1
					const monthStr = language[Months[monthId as keyof typeof Months]]
					const year = date.getFullYear().toString().slice(2)
					const title = `${monthStr} '${year}`
					const existingGroup = groups.find(group => group.title === title)

					if (existingGroup) {
						existingGroup.transactions.push(transaction)
					} else {
						groups.push({
							title,
							transactions: [transaction],
						})
					}
				})

				setTransactionGroups(groups)
				setShownTransactionGroups(groups)
			})
		}
		let k = 0
		let timeout = 0
		const interval = setInterval(() => {
			k++
			if (k > 4) {
				clearInterval(interval)
			}

			timeout = timeout + 1000 * k
			fetchData()
		}, timeout)
		fetchData()
	}, [rerender, account.id])

	const accountService = AccountService.getInstance()

	const fetchMenuData = (accountId: string, from?: string, to?: string) => {
		accountService.getNetworth(accountId, from, to).then(data => {
			setNeworth(data)
		})

		accountService.getTotal(accountId, from, to).then(data => {
			setTotal(data)
		})

		accountService.getIncomes(accountId, from, to).then(data => {
			setIncomes(data)
		})

		accountService.getExpenses(accountId, from, to).then(data => {
			setExpenses(data)
		})
	}

	React.useEffect(() => {
		fetchMenuData(account.id)
	}, [account.id])

	const handleTabChange = (tabName: string) => {
		if (tabName === language.ALL_TIME || tabName === language.CUSTOM) {
			fetchMenuData(account.id)
			return
		}

		if (tabName.length === 4) {
			const start = `01-01-${tabName} 00:00:00`
			const end = `12-31-${tabName} 23:59:59`
			fetchMenuData(account.id, start, end)
			return
		}

		const monthStrId = Object.entries(language).find(
			([_, value]) => value === tabName.split(' ')[0]
		)?.[0]
		const monthId = Object.entries(Months).find(
			([_, value]) => value === monthStrId
		)?.[0]
		const startStr = `0${monthId}-01-20${tabName.slice(-2)} 00:00:00`
		const end = new Date(`0${monthId}-01-20${tabName.slice(-2)}`)
		end.setMonth(end.getMonth() + 1)
		end.setDate(end.getDate() - 1)
		const endStr = `0${
			end.getMonth() + 1
		}-${end.getDate()}-${end.getFullYear()} 23:59:59`
		fetchMenuData(account.id, startStr, endStr)
	}

	const handleFilter = (text: string) => {
		const transactions = transactionGroups.slice()
		const filteredTransactions = transactions.map(group => {
			return {
				title: group.title,
				transactions: group.transactions.filter(transaction => {
					if (transaction.category) {
						return (
							transaction.category?.name
								.toLowerCase()
								.includes(text.toLowerCase()) ||
							transaction.note?.toLowerCase().includes(text.toLowerCase())
						)
					} else {
						return transaction.note?.toLowerCase().includes(text.toLowerCase())
					}
				}),
			}
		})
		setShownTransactionGroups(filteredTransactions)
		setFilter(text)
	}

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<KeyboardAwareScrollView
					extraScrollHeight={10}
					contentContainerStyle={{ paddingBottom: 200 }}
				>
					<TopMenu navigation={props.navigation} />

					<Title
						style={{ top: 100 }}
						emoji={account.emoji}
						title={account.name}
					/>
					<View style={styles.tabs}>
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
							callback={handleTabChange}
						/>
					</View>
					<DataBoxPanel
						boxes={{
							leftTop: {
								title: language.TOTAL,
								data: total?.toFixed(2) + currencySymbol,
							},
							rightTop: {
								title: language.NET_WORTH,
								data: networth?.toFixed(2) + currencySymbol,
							},
							leftBottom: {
								title: language.INCOMES,
								data: incomes?.toFixed(2) + currencySymbol,
							},
							rightBottom: {
								title: language.EXPENSES,
								data: Math.abs(expenses || 0)?.toFixed(2) + currencySymbol,
							},
						}}
					/>
					<Title style={{ top: 100 }} title={language.TRANSACTIONS} />
					<View style={styles.searchWrapper}>
						<SearchField
							placeholder={language.SEARCH}
							value={filter}
							onChangeText={handleFilter}
						/>
					</View>
					<View style={[styles.contentWrapper, { height: '30%' }]}>
						{shownTransactionGroups.map((group, _) => {
							return (
								<MenuGroup
									style={{ fontSize: 20 }}
									title={group.title}
									children={
										<View style={styles.items}>
											{group.transactions.map((transaction, index) => {
												return (
													<Transaction
														key={index}
														emoji={transaction.category?.icon || ''}
														category={transaction.category?.name || ''}
														description={transaction.note || ''}
														amount={`${transaction.amount} ${currencySymbol}`}
														isIncome={
															transaction.type.toLowerCase() ===
																TransactionTypes.INCOME.toLowerCase() ||
															transaction.type.toLowerCase() ===
																TransactionTypes.REVENUE.toLowerCase()
														}
														callBack={() => transferToEditor(transaction)}
													/>
												)
											})}
										</View>
									}
								/>
							)
						})}
					</View>
				</KeyboardAwareScrollView>
				<View style={styles.bottomButton}>
					<TouchableOpacity onPress={() => transferToEditor(null)}>
						<FontAwesome name='plus' size={32} color='#3D4CC9' />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
	)
}
