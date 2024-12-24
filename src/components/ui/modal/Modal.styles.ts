import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	modalBackground: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	modal: {
		width: 300,
		top: 40,
		padding: 5,
		paddingBottom: 20,
		borderWidth: 5,
		borderColor: '#3D4CC9',
		backgroundColor: 'white',
		borderRadius: 25,
	},
})
