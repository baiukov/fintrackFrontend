import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	input: {
		backgroundColor: '#3D4CC9',
		height: 30,
		width: 300,
		borderRadius: 15,
		borderWidth: 0,
		paddingHorizontal: 20,
	},

	text: {
		color: 'white',
		fontSize: 18,
		paddingVertical: 5,
	},

	container: {
		backgroundColor: '#3D4CC9',
		width: 300,
		zIndex: 100,
	},

	icon: {
		tintColor: '#FF6347',
	},

	emptyText: {
		color: 'white',
		fontSize: 18,
		padding: 10,
	},

	error: {
		marginTop: 20,
		color: '#B90000',
	},
})
