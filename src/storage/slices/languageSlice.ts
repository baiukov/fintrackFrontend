import { createSlice } from '@reduxjs/toolkit'
import { Slices } from '../../enums/Slices'
import { Messages } from '../../language/Messages'

const supportedLanguages = Object.keys(Messages)

const initialState = {
	language: Messages.EN,
}

const languageSlice = createSlice({
	name: Slices.LANGUAGE,
	initialState,
	reducers: {
		setLanguage(state, action) {
			if (supportedLanguages.includes(action.payload)) {
				state.language = action.payload
			} else {
				console.warn(`Unsupported language: ${action.payload}`)
			}
		},
	},
})

export const { setLanguage } = languageSlice.actions

export default languageSlice.reducer
