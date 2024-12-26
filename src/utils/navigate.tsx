import React from 'react'
import { MainPage } from '../pages/main/MainPage'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Pages } from '../enums/Pages'
import { AccountEditorPage1 } from '../pages/editors/AccountEditor/AccountEditorPage1'
import { AccountEditorPage2 } from '../pages/editors/AccountEditor/AccountEditorPage2'
import { AccountEditorPage3 } from '../pages/editors/AccountEditor/AccountEditorPage3'
import { AssetEditorPage1 } from '../pages/editors/AssetEditor/AssetEditorPage1'
import { AssetEditorPage2 } from '../pages/editors/AssetEditor/AssetEditorPage2'
import { AssetEditorPage3 } from '../pages/editors/AssetEditor/AssetEditorPage3'
import { GroupEditorPage1 } from '../pages/editors/GroupEditor/GroupEditorPage1'
import { GroupEditorPage2 } from '../pages/editors/GroupEditor/GroupEditorPage2'
import { GroupEditorPage3 } from '../pages/editors/GroupEditor/GroupEditorPage3'
import { HomePage } from '../pages/home/HomePage'
import { LoginPage } from '../pages/login/LoginPage'
import { MainMenuPage } from '../pages/mainMenuPage/MainMenuPage'
import { PincodeLoginPage } from '../pages/pincodeLogin/PincodeLoginPage'
import { SignupPage } from '../pages/signup/SignupPage'

const Stack = createStackNavigator()

export default function navigate() {
	return (
		<NavigationContainer>
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
				<Stack.Screen name={Pages.PINCODE_LOGIN} component={PincodeLoginPage} />
				<Stack.Screen name={Pages.MAIN_MENU} component={MainMenuPage} />
				<Stack.Screen name={Pages.HOME_PAGE} component={HomePage} />
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

				<Stack.Screen name={Pages.ASSET_EDITOR} component={AssetEditorPage1} />
				<Stack.Screen name={Pages.ASSET_EDITOR2} component={AssetEditorPage2} />
				<Stack.Screen name={Pages.ASSET_EDITOR3} component={AssetEditorPage3} />
				<Stack.Screen name={Pages.GROUP_EDITOR} component={GroupEditorPage1} />
				<Stack.Screen name={Pages.GROUP_EDITOR2} component={GroupEditorPage2} />
				<Stack.Screen name={Pages.GROUP_EDITOR3} component={GroupEditorPage3} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
