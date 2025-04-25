import * as AppleAuthentication from 'expo-apple-authentication'
import React from 'react'
import { styles } from './AuthServiceButton.style'

export interface ButtonParams {
	callback: () => any
}

export const AppleButton = (props: ButtonParams) => {
	return (
		<AppleAuthentication.AppleAuthenticationButton
			buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
			buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
			cornerRadius={14}
			style={styles.apple}
			onPress={props.callback}
		/>
	)
}
