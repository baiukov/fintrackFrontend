import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#3D4CC9',
		width: 325,
		height: 60,
		borderRadius: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		alignItems: 'center',
	},

	title: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},

	description: {
		fontSize: 15,
		color: 'rgba(255, 255, 255, 0.5)',
	},

	innerContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},

	amount: {
		color: 'white',
		fontWeight: 'bold',
	},

	titleWrapper: {
		display: 'flex',
	},

	income: {
		color: '#00FF00',
	},

	expense: {
		color: '#FF0000',
	},
})
