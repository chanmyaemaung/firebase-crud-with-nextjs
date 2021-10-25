import { createContext, useState } from 'react'

export const TodoContext = createContext(null)

const MyTodo = ({ children }) => {
	// * ကိုယ်ပေးချင်တဲ့ keys တွေကို ရှင်းလင်းအောင် တမင်ကြေညာထားခြင်း
	const initialState = {
		title: '',
		details: '',
	}

	const [open, setOpen] = useState(false)
	const [alertType, setAlertType] = useState('success')
	const [alertMessage, setAlertMessage] = useState('')
	const [todos, setTodos] = useState(initialState)

	// * Snackbar အတွက် ပြင်ဆင်ထားခြင်း
	const showAlert = (type, msg) => {
		setAlertType(type)
		setAlertMessage(msg)
		setOpen(true)
	}

	// * အလိုအလျောက် snackbar ပိတ်ခြင်း
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	return (
		<TodoContext.Provider
			value={{
				showAlert,
				handleClose,
				open,
				alertType,
				alertMessage,
				todos,
				setTodos,
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}

export default MyTodo
