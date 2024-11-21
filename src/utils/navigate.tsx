import React from 'react'
import { MainPage } from '../pages/main/MainPage'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Pages } from '../enums/Pages'
import { LoginPage } from '../pages/login/LoginPage'

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
			</Stack.Navigator>
		</NavigationContainer>
	)
}
