import Layout from '@components/Layout/index'
import TodoForm from '@components/Todo/TodoForm'
import TodoList from '@components/Todo/TodoList'
import { Alert, Snackbar } from '@mui/material'
import { useContext } from 'react'
import { TodoContext } from '@context/MyTodoContext'
import Profile from '@components/profile/index'
import nookies from 'nookies'
import { verifyIdToken } from '@firebase/firebaseAdmin'
import { collection, getDocs, orderBy, query, where } from '@firebase/firestore'
import { db } from '@firebase/index'

const Home = ({ todoProps }) => {
	// * context api မှ တစ်ဆင့် မျှထားတဲ့ ဒေတာတွေကို ပြန်ခေါ်သုံးခြင်း
	const { open, handleClose, alertMessage, alertType } = useContext(TodoContext)

	return (
		<Layout>
			<Profile />
			<TodoForm />
			{/* SNACK BAR */}
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={alertType}
					sx={{ width: '100%' }}
				>
					{alertMessage}
				</Alert>
			</Snackbar>
			<TodoList todoProps={todoProps} />
		</Layout>
	)
}

export default Home

// TODO: SERVER SIDE
export async function getServerSideProps(context) {
	try {
		const cookies = nookies.get(context)
		const token = await verifyIdToken(cookies.token)
		const { email } = token
		const collectionRef = collection(db, 'chenTodos')

		const q = query(
			collectionRef,
			where('email', '==', email),
			orderBy('timestamp', 'desc')
		)

		const querySnapshot = await getDocs(q)

		let todos = []

		querySnapshot.forEach((doc) => {
			todos.push({
				...doc.data(),
				id: doc.id,
				timestamp: doc.data().timestamp.toDate().getTime(),
			})
		})

		return {
			props: {
				todoProps: JSON.stringify(todos) || [],
			},
		}
	} catch (error) {
		return {
			props: {},
		}
	}
}
