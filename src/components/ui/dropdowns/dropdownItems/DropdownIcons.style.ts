import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	input: {
		backgroundColor: '#3D4CC9',
		height: 50,
		width: 300,
		borderRadius: 15,
	},

	text: {
		color: 'white',
		fontSize: 18,
	},

	container: {
		backgroundColor: '#3D4CC9',
		opacity: 0.8,
		width: '90%',
		maxWidth: 300,
	},

	itemContainer: {
		backgroundColor: '#3D4CC9',
	},

	arrowIcon: {
		tintColor: '#FF6347',
	},

	emptyText: {
		color: 'white',
		fontSize: 18,
		padding: 10,
	},

	error: {
		color: '#B90000',
	},

	icon: {
		width: 10,
		height: 10,
	},

	customItemContainer: {
		width: 200, // Уменьшаем ширину элемента списка
		alignSelf: 'center', // Центрируем элемент списка
		backgroundColor: '#5252ed',
		padding: 12,
		marginVertical: 4,
		borderRadius: 6,
	},
	itemText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
	},
})
