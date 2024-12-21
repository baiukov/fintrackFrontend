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
		top: 0,
		padding: 10,
		borderWidth: 5,
		borderColor: '#3D4CC9',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		borderRadius: 15,
	},
})
