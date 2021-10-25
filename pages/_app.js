import AuthProvider from '@context/Auth'
import MyTodo from '@context/MyTodoContext'

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<MyTodo>
				<Component {...pageProps} />
			</MyTodo>
		</AuthProvider>
	)
}

export default MyApp
