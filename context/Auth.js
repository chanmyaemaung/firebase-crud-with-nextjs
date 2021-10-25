import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import Loading from '@components/loading/index'
import LoginWithGoogle from '@components/login/index'
import nookies from 'nookies'

const AuthContext = createContext({})

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const auth = getAuth()

		return auth.onIdTokenChanged(async (user) => {
			if (!user) {
				console.log('အသုံးပြုသူ တစ်ယောက်မျှမရှိပါ')
				setCurrentUser(null)
				setLoading(false)
				nookies.set(undefined, '', token, {})

				return
			}

			const token = await user.getIdToken()
			setCurrentUser(user)
			setLoading(false)
			nookies.set(undefined, 'token', token, {})

			console.log('သင့်ရဲ့ Token', token)
			console.log('အသုံးပြုသူ', user)
		})
	}, [])

	if (loading) {
		return <Loading type='bars' color='#ffd700' />
	}

	if (!currentUser) {
		return <LoginWithGoogle />
	} else {
		return (
			<AuthContext.Provider value={{ currentUser }}>
				{children}
			</AuthContext.Provider>
		)
	}
}

export const useAuth = () => useContext(AuthContext)
