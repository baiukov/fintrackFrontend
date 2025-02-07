import { StyleSheet } from 'react-native'

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
		fontSize: 54,
		textAlign: 'center',
		color: 'white',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},

	subheader: {
		fontSize: 24,
		textAlign: 'center',
		color: 'white',
	},

	headerWrapper: {
		height: 180,
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

	form: {
		gap: 80,
	},

	textFields: {
		display: 'flex',
		alignItems: 'center',
		gap: 20,
	},

	inputFields: {
		display: 'flex',
		alignItems: 'center',
		gap: 30,
	},

	bottomMenu: {
		marginTop: 40,
		marginBottom: 40,
	},
})
