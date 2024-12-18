import { create } from 'zustand'
import { Messages } from '../language/Messages'

export const useStore = create(set => ({
	language: Messages.EN,

	setLanguage: (language: Record<string, string>) => set({ language }),
}))
