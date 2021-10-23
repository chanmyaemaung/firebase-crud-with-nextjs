import MyTodo from '@context/index'

function MyApp({ Component, pageProps }) {
	return (
		<MyTodo>
			<Component {...pageProps} />
		</MyTodo>
	)
}

export default MyApp
