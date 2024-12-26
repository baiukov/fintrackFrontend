import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	itemContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#3D4CC9',
		width: 300,
		height: 40,
		borderRadius: 10,
		alignItems: 'center',
		paddingHorizontal: 10,
	},

	text: {
		color: 'white',
		fontSize: 18,
	},

	emoji: {
		fontSize: 18,
	},

	itemTitleContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
	},

	items: {
		marginTop: 20,
		display: 'flex',
		alignSelf: 'center',
	},

	innerItems: {
		top: 25,
	},
})
