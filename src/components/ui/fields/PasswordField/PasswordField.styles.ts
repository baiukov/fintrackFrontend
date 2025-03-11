import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	input: {
		color: '#A5A5A5',
		width: 300,
		height: 40,
		borderBottomColor: 'white',
		borderBottomWidth: 3,
		paddingLeft: 5,
		fontSize: 18,
	},
	error: {
		color: '#B90000',
	},
	inputWrapper: {
		display: 'flex',
	},
	icon: {
		position: 'absolute',
		right: 0,
		top: 0,
		padding: 5,
	},
})
