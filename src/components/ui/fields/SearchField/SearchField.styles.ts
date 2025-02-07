import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	input: {
		color: '#A5A5A5',
		width: 250,
		height: 40,
		borderBottomColor: 'white',
		borderBottomWidth: 3,
		paddingLeft: 5,
		fontSize: 18,
	},

	option: {
		backgroundColor: '#3D4CC9',
		width: 250,
		height: 40,
		borderRadius: 10,
		display: 'flex',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},

	options: {
		position: 'absolute',
		top: 40,
		zIndex: 1,
		maxHeight: 90,
	},

	optionText: {
		color: 'white',
		fontSize: 17,
	},
})
