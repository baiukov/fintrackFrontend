import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	box: {
		borderWidth: 3,
		borderColor: 'white',
		height: 400,
		borderRadius: 20,
		width: '80%',
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: 20,
		paddingTop: 5,
	},

	title: {
		textAlign: 'center',
		color: 'white',
		fontSize: 16,
	},

	searchField: {
		display: 'flex',
		alignItems: 'center',
	},

	listItemText: {
		color: 'white',
		fontSize: 24,
	},

	listItem: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		paddingBottom: 15,
	},

	itemsList: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		height: 305,
	},
})
