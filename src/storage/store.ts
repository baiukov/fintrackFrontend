import { create } from 'zustand'
import { Messages } from '../language/Messages'
import { User } from '../model/User'

export const useStore = create(set => ({
	language: Messages.EN,
	user: null,

	setLanguage: (language: Record<string, string>) => set({ language }),
	setUser: (user: User) => set({ user }),
}))
