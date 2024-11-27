import React from 'react'
import { MainPage } from '../pages/main/MainPage'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { Pages } from '../enums/Pages'
import { LoginPage } from '../pages/login/LoginPage'
import { PincodeLoginPage } from '../pages/pincodeLogin/PincodeLoginPage'
import { SignupPage } from '../pages/signup/SignupPage'
import store from '../storage/store'

const Stack = createStackNavigator()

export default function navigate() {
	return (
		<Provider store={store}>
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
					<Stack.Screen
						name={Pages.PINCODE_LOGIN}
						component={PincodeLoginPage}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
