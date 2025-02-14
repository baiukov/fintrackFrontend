import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { DimensionValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

export interface TabsProps {
	tabs: { title: string; component: React.ComponentType }[]
	callback?: (tabId: string) => any
	style?: {
		width?: DimensionValue
		fontSize?: number
		tabBarScrollEnabled?: boolean
		itemWidth?: DimensionValue
		tabBarLabelPadding?: number
	}
}

export const Tabs = (props: TabsProps) => {
	const Tab = createMaterialTopTabNavigator()

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: {
					backgroundColor: 'none',
					padding: props.style?.tabBarLabelPadding || 0,
					margin: 0,
					fontSize: props.style?.fontSize || 20,
				},
				tabBarStyle: {
					backgroundColor: 'none',
					alignSelf: 'center',
					width: props.style?.width || '100%',
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
					width: props.style?.itemWidth || undefined,
				},
				tabBarIndicatorStyle: {
					backgroundColor: 'white',
				},
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
				sceneStyle: {
					backgroundColor: 'none',
				},
				tabBarScrollEnabled: props.style?.tabBarScrollEnabled || false,
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
