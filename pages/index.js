import Layout from '@components/Layout/index'
import TodoForm from '@components/Todo/TodoForm'
import TodoList from '@components/Todo/TodoList'
import { Alert, Snackbar } from '@mui/material'
import { useContext } from 'react'
import { TodoContext } from '@context/index'

function Home() {
	// * context api မှ တစ်ဆင့် မျှထားတဲ့ ဒေတာတွေကို ပြန်ခေါ်သုံးခြင်း
	const { open, handleClose, alertMessage, alertType } = useContext(TodoContext)

	return (
		<Layout>
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
			<TodoList />
		</Layout>
	)
}

export default Home
