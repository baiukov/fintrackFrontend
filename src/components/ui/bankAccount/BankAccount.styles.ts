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
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold',
	},

	innerContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},

	amount: {
		opacity: 0.8,
		color: 'white',
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
