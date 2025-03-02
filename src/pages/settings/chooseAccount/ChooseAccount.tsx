import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { BankAccount } from '../../../components/ui/bankAccount/BankAccount'
import { Pages } from '../../../enums/Pages'
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

export const ChooseAccount = (props: any) => {
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
		service.fetchUrl(account.id).then((url: string | undefined) => {
			setAuthUrl(url || '')
		})
	})

	const service = AccountService.getInstance()
	React.useEffect(() => {
		const fetchData = async () => {
			setTimeout(async () => {
				const response = (await service.getBankAccounts(
					account.id
				)) as BankAccountResponse

				console.log(response)
				if (!response.areAccountsLoaded) {
					fetchData()
				} else {
					setAccounts(response.accounts)
				}
			}, 10 * 1000)
		}

		fetchData()
	}, [account.id])

	const setAccountInitialAmount = async (initialAmount: number) => {
		await service.setAccountInitialAmount(account.id, initialAmount)
		props.navigation.reset({
			index: 0,
			routes: [{ name: Pages.HOME_PAGE }],
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
