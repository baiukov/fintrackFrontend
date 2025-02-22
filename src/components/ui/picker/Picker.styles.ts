import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	input: {
		backgroundColor: '#3D4CC9',
		height: 50,
		width: 300,
		borderRadius: 15,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},

	text: {
		color: 'white',
		fontSize: 18,
		paddingBottom: 5,
	},

	pickerItemList: {
		backgroundColor: '#3D4CC9',
		height: 300,
		borderRadius: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		flexWrap: 'wrap',
	},

	error: {
		color: '#B90000',
	},
})
