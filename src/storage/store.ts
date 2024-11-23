import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'

export interface RootState {
	language: {
		language: string
	}
}

const store = configureStore({
	reducer: {
		language: languageReducer,
	},
})

export default store
