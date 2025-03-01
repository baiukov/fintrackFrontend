import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { BankAccount } from '../../../components/ui/bankAccount/BankAccount'
import { BankAccountType } from '../../../model/BankAccountType'
import { AccountService } from '../../../services/Account.service'
import { TinkService } from '../../../services/Tinks.service'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'
import { styles } from './ChooseAccount.style'

interface BankAccountResponse {
	areAccountsLoaded: boolean
	exception: string
	accounts: BankAccountType[]
}

export const ChooseAccount = () => {
	const [language, setLanguage] = React.useState(
		useStore((state: any) => state.language)
	)

	const [account, setAccount] = React.useState(
		useStore((state: any) => state.account)
	)
	const [accounts, setAccounts] = React.useState<BankAccountType[]>([])

	const user = useStore((state: any) => state.user)

	const [authUrl, setAuthUrl] = React.useState('')

	React.useEffect(() => {
		const service = TinkService.getInstance()
		service.fetchUrl(user.id).then((url: string | undefined) => {
			console.log(url)
			setAuthUrl(url || '')
		})
	})

	const service = AccountService.getInstance()
	React.useEffect(() => {
		const fetchData = async () => {
			const response = (await service.getBankAccounts(
				account.id
			)) as BankAccountResponse

			console.log(response)
			if (!response.areAccountsLoaded) {
				setTimeout(() => fetchData(), 10 * 1000)
			} else {
				setAccounts(response.accounts)
			}
		}

		console.log('here')
		fetchData()
	}, [account.id])

	const setAccountInitialAmount = async (initialAmount: number) => {
		const response = (await service.setAccountInitialAmount(
			account.id,
			initialAmount
		)) as BankAccountResponse
	}

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background, GlobalStyles.center]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				{accounts.length === 0 ? (
					<View style={styles.webviewContainer}>
						<WebView source={{ uri: authUrl }} />
					</View>
				) : (
					<View style={GlobalStyles.headerWrapper}>
						<Text
							style={GlobalStyles.header}
						>{`${language.CHOOSE_ACCOUNT}`}</Text>
					</View>
				)}

				{accounts.map((account, index) => {
					return (
						<BankAccount
							key={index}
							name={account.name}
							balance={account.balance.toString()}
							currency={account.currency}
							callBack={() => setAccountInitialAmount(account.balance)}
						/>
					)
				})}

				<View style={{ gap: 20 }}></View>
			</LinearGradient>
		</View>
	)
}
