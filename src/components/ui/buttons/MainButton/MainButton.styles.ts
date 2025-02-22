import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	button: {
		width: 300,
		height: 45,
		textAlign: 'center',
		borderRadius: 15,
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		marginBottom: 10,
	},

	primary: {
		backgroundColor: '#3D4CC9',
	},

	secondary: {
		borderColor: '#FFFFFF',
		borderWidth: 2.5,
	},

	text: {
		color: 'white',
		textAlign: 'center',
		fontSize: 17,
		paddingBottom: 3,
		fontWeight: 600,
	},
})
