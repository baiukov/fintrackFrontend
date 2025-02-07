import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	checkBoxWrapper: {
		width: 25,
		height: 25,
		backgroundColor: '#2C2C2C',
		borderRadius: 5,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	icon: {
		width: 18,
		height: 18,
	},

	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		height: 50,
	},

	title: {
		color: 'white',
		fontSize: 20,
		paddingLeft: 10,
		fontWeight: 'bold',
	},

	description: {
		color: '#686868',
		fontSize: 12,
		paddingLeft: 10,
	},

	checkMark: {
		position: 'absolute',
	},
})
