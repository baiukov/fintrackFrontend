import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'

export interface TabsProps {
	tabs: { title: string; component: React.ComponentType }[]
	callback?: (tabId: string) => any
}

export const Tabs = (props: TabsProps) => {
	const Tab = createMaterialTopTabNavigator()

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: {
					backgroundColor: 'none',
					padding: 0,
					margin: 0,
					fontSize: 24,
				},
				tabBarStyle: {
					backgroundColor: 'none',
					padding: 0,
					alignSelf: 'center',
					width: '60%',
					marginBottom: 20,
				},
				tabBarContentContainerStyle: {
					justifyContent: 'center',
					display: 'flex',
				},
				tabBarItemStyle: {
					borderBottomWidth: 2,
					borderBottomColor: 'rgba(255, 255, 255, 0.5)',
					padding: 0,
				},
				tabBarIndicatorStyle: {
					backgroundColor: 'white',
				},
				tabBarIndicatorContainerStyle: {},
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
				sceneStyle: {
					backgroundColor: 'none',
				},
			}}
			screenListeners={{
				state: event => {
					if (!props.callback) return
					const currentRoute =
						event.data.state?.routes[event.data.state.index].name
					if (currentRoute) {
						props.callback(currentRoute)
					}
				},
			}}
		>
			{props.tabs.map((tab, index) => (
				<Tab.Screen key={index} name={tab.title} component={tab.component} />
			))}
		</Tab.Navigator>
	)
}
