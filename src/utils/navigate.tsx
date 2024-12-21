import React from 'react'
import { MainPage } from '../pages/main/MainPage'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Pages } from '../enums/Pages'
import { AccountEditorPage1 } from '../pages/editors/AccountEditorPage'
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
				<Stack.Screen
					name={Pages.MAIN_MENU}
					component={MainMenuPage}
				></Stack.Screen>
				<Stack.Screen
					name={Pages.ACCOUNT_EDITOR}
					component={AccountEditorPage1}
				></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
