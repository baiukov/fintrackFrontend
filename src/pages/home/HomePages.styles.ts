import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	topMenu: {
		top: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},

	topLeftMenu: {
		flexDirection: 'row',
		gap: 10,
	},

	title: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
		letterSpacing: 1,
	},

	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textTransform: 'uppercase',
	},

	titleEmoji: {
		fontSize: 24,
	},

	dataBox: {
		width: '50%',
		height: 80,
		borderColor: 'rgba(255, 255, 255, 0.3)',
		paddingHorizontal: 15,
		paddingVertical: 10,
		gap: 0,
	},

	leftBorder: {
		borderBottomWidth: 2,
		borderRightWidth: 1,
		borderTopWidth: 1,
	},

	rightBorder: {
		borderBottomWidth: 2,
		borderLeftWidth: 1,
		borderTopWidth: 1,
	},

	dataBoxTitle: {
		color: 'white',
		fontSize: 20,
		fontWeight: 200,
	},

	dataBoxData: {
		color: 'white',
		fontSize: 24,
		fontWeight: 600,
	},

	dataBoxPanel: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginTop: 10,
		top: 100,
	},

	tabs: {
		top: 110,
		height: 75,
		width: '100%',
	},

	searchWrapper: {
		top: 110,
		display: 'flex',
		alignItems: 'center',
	},

	contentWrapper: {
		top: 120,
		display: 'flex',
		alignItems: 'center',
	},

	items: {
		gap: 10,
	},

	bottomButton: {
		position: 'absolute',
		bottom: 30,
		alignSelf: 'center',
		backgroundColor: '#A3ACFF',
		width: 60,
		height: 60,
		borderRadius: 999,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
