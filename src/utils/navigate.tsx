import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Pages } from '../enums/Pages'
import { Categories } from '../pages/categories/Categories'
import { AccountEditorPage1 } from '../pages/editors/AccountEditor/AccountEditorPage1'
import { AccountEditorPage2 } from '../pages/editors/AccountEditor/AccountEditorPage2'
import { AccountEditorPage3 } from '../pages/editors/AccountEditor/AccountEditorPage3'
import { AssetEditorPage1 } from '../pages/editors/AssetEditor/AssetEditorPage1'
import { AssetEditorPage2 } from '../pages/editors/AssetEditor/AssetEditorPage2'
import { AssetEditorPage3 } from '../pages/editors/AssetEditor/AssetEditorPage3'
import { CategoryEditor } from '../pages/editors/CategoryEditor.tsx/CategoryEditor'
import { GroupEditorPage1 } from '../pages/editors/GroupEditor/GroupEditorPage1'
import { GroupEditorPage2 } from '../pages/editors/GroupEditor/GroupEditorPage2'
import { GroupEditorPage3 } from '../pages/editors/GroupEditor/GroupEditorPage3'
import { StandingOrderEditor } from '../pages/editors/StandingOrderEditor/StandingOrderEditor'
import { TransactionEditor } from '../pages/editors/TransactionEditor/TransactionEditor'
import { GeneralStatement } from '../pages/generalStatement/GeneralStatement'
import { Graph } from '../pages/graph/Graph'
import { HomePage } from '../pages/home/HomePage'
import { LoginPage } from '../pages/login/LoginPage'
import { MainPage } from '../pages/main/MainPage'
import { MainMenuPage } from '../pages/mainMenuPage/MainMenuPage'
import { AccountRemovePage } from '../pages/password/AccountRemovePage'
import { PincodePage } from '../pages/pincode/PincodePage'
import { EmailRecovery } from '../pages/recovery/email/EmailRecovery'
import { PasswordRecovery } from '../pages/recovery/passwordRecovery/PasswordRecovery'
import { SmtpCode } from '../pages/recovery/smtp code/SmtpCode'
import { Settings } from '../pages/settings/Settings'
import { UserAccountSettings } from '../pages/settings/UserAccountSettings'
import { ChooseAccount } from '../pages/settings/chooseAccount/ChooseAccount'
import { SignupPage } from '../pages/signup/SignupPage'
import { navigationRef } from './RootNavigation'

const Stack = createStackNavigator()

export default function navigate() {
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator
				screenOptions={{
					headerTransparent: true,
					headerTitle: '',
					headerTintColor: '#fff',
					headerStyle: {
						backgroundColor: 'rgba(0,0,0,0)',
					},
				}}
			>
				<Stack.Screen
					name={Pages.MAIN}
					component={MainPage}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name={Pages.LOGIN} component={LoginPage} />
				<Stack.Screen name={Pages.SIGNUP} component={SignupPage} />
				<Stack.Screen name={Pages.PINCODE} component={PincodePage} />
				<Stack.Screen name={Pages.MAIN_MENU} component={MainMenuPage} />
				<Stack.Screen name={Pages.HOME_PAGE} component={HomePage} />
				<Stack.Screen name={Pages.SETTINGS} component={Settings} />
				<Stack.Screen name={Pages.CATEGORIES} component={Categories} />
				<Stack.Screen name={Pages.GRAPH} component={Graph} />
				<Stack.Screen
					name={Pages.GENERAL_STATEMENT}
					component={GeneralStatement}
				/>
				<Stack.Screen
					name={Pages.ACCOUNT_EDITOR}
					component={AccountEditorPage1}
				/>
				<Stack.Screen
					name={Pages.ACCOUNT_EDITOR2}
					component={AccountEditorPage2}
				/>
				<Stack.Screen
					name={Pages.ACCOUNT_EDITOR3}
					component={AccountEditorPage3}
				/>

				<Stack.Screen name={Pages.FETCH_BANKS} component={ChooseAccount} />

				<Stack.Screen name={Pages.ASSET_EDITOR} component={AssetEditorPage1} />
				<Stack.Screen name={Pages.ASSET_EDITOR2} component={AssetEditorPage2} />
				<Stack.Screen name={Pages.ASSET_EDITOR3} component={AssetEditorPage3} />
				<Stack.Screen name={Pages.GROUP_EDITOR} component={GroupEditorPage1} />
				<Stack.Screen name={Pages.GROUP_EDITOR2} component={GroupEditorPage2} />
				<Stack.Screen name={Pages.GROUP_EDITOR3} component={GroupEditorPage3} />
				<Stack.Screen
					name={Pages.TRANSACTION_EDITOR}
					component={TransactionEditor}
				/>
				<Stack.Screen
					name={Pages.STANDING_ORDER_EDITOR}
					component={StandingOrderEditor}
				/>
				<Stack.Screen name={Pages.CATEGORY_EDITOR} component={CategoryEditor} />
				<Stack.Screen name={Pages.EMAIL_RECOVERY} component={EmailRecovery} />
				<Stack.Screen name={Pages.SMTP_CODE} component={SmtpCode} />
				<Stack.Screen name={Pages.NEW_PASSWORD} component={PasswordRecovery} />
				<Stack.Screen
					name={Pages.USER_ACCOUNT_SETTNGS}
					component={UserAccountSettings}
				/>
				<Stack.Screen
					name={Pages.ACCOUNT_REMOVE_PAGE}
					component={AccountRemovePage}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
