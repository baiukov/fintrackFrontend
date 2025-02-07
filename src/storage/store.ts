import { create } from 'zustand'
import { Messages } from '../language/Messages'
import { Account } from '../model/Account'
import { User } from '../model/User'

export const useStore = create(set => ({
	language: Messages.EN,
	user: null,
	account: null,

	setLanguage: (language: Record<string, string>) => set({ language }),
	setUser: (user: User) => set({ user }),
	setAccount: (account: Account) => set({ account }),
}))
