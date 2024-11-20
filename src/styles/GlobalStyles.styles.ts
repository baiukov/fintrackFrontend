import { StyleSheet } from 'react-native'

const backgroundColor = 'linear-gradient(45deg, #373F50 0%, #00000 100%)'

export const GlobalStyles = StyleSheet.create({
	main: {
		backgroundColor: 'linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%)',
		borderColor: 'red',
		borderWidth: 5,
	},

	page: {
		width: '100%',
		height: '100%',
	},
})
