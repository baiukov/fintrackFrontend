import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	list: {
		borderWidth: 3,
		borderColor: 'white',
		height: 150,
		borderRadius: 20,
		padding: 10,
		display: 'flex',
		flexDirection: 'column',
	},

	listTitle: {
		color: 'white',
	},

	listContent: {
		top: 15,
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
	},
})
