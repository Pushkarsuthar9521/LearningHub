import { create } from 'zustand'
import { MeDocument, MeQuery } from '../generated/graphql'
import apolloClient from '../lib/apollo'
import { User } from '../types'

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  login: (token, user) => {
    localStorage.setItem('token', token)
    set({ token, user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null, isAuthenticated: false })
  },
  fetchUser: async () => {
    const { token } = get()
    if (token) {
      try {
        const { data } = await apolloClient.query<MeQuery>({
          query: MeDocument
        })
        if (data.me) {
          set({ user: data.me as User })
        }
      } catch (error) {
        console.error('Failed to fetch user', error)
        get().logout()
      }
    }
  }
}))

// Fetch user on initial load
useAuthStore.getState().fetchUser()
