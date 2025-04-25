import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	google: {
		backgroundColor: '#4285F4',
		borderWidth: 2,
		borderColor: '#4285F4',
		flexDirection: 'row',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 300,
		gap: 5,
	},

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

	text: {
		color: 'white',
		textAlign: 'center',
		fontSize: 15,
		paddingBottom: 3,
		fontWeight: 600,
	},

	icon: {
		width: 16,
		height: 16,
	},

	googleIcon: {
		backgroundColor: '#fff',
		borderRadius: 50,
		padding: 2,
	},

	facebookIcon: {
		width: 16,
		height: 16,
		backgroundColor: '#fff',
		borderRadius: 50,
	},

	apple: {
		width: 300,
		height: 45,
		marginBottom: 10,
	},

	facebook: {
		backgroundColor: '#3B5998',
		borderWidth: 2,
		borderColor: '#3b5998',
		flexDirection: 'row',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 300,
		gap: 5,
	},
})
