import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	item: {
		width: 300,
		height: 60,
		borderRadius: 15,
		color: 'white',
		marginBottom: 10,
		backgroundColor: '#3D4CC9',
		display: 'flex',
		justifyContent: 'center',
	},

	text: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'medium',
		fontSize: 15,
	},

	icon: {
		width: 20,
		height: 20,
	},

	innerBlock: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
	},
})
