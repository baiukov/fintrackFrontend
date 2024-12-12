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

	background: {
		backgroundColor: '#000',
		width: '100%',
		height: '100%',
	},

	center: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},

	header: {
		fontSize: 64,
		textAlign: 'center',
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},

	headerWrapper: {
		height: 300,
		display: 'flex',
		justifyContent: 'flex-end',
		marginBottom: 40,
	},

	tabs: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		color: 'white',
	},

})
