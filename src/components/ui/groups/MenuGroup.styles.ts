import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	title: {
		color: 'white',
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 10,
		alignSelf: 'center',
		textTransform: 'capitalize',
	},

	items: {
		gap: 5,
		marginBottom: 30,
	},

	icon: {
		width: 20,
		height: 20,
	},

	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10,
	},

	iconContainer: {
		alignSelf: 'center',
	},
})
