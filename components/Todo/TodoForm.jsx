import { Button, TextField } from '@mui/material'
import {
	collection,
	addDoc,
	serverTimestamp,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { db } from '@firebase/index'
import { useContext, useEffect, useRef } from 'react'
import { TodoContext } from '@context/index'
function TodoForm() {
	// * (1, 2) Context Api ထဲက သတ်မှတ်ထားခဲ့ထဲ့ ဖန်ရှင်ကို ပြန်ခေါ်သုံးထားခြင်း
	const { showAlert, todos, setTodos } = useContext(TodoContext)

	// * (4) ဒီကောင်လေးကတော့ ဖောင်ထဲမှာရှိတဲ့ input တန်ဖိုးတွေကို ဆွဲထုတ်ဖို့ပဲဖြစ်တယ်
	const inputRef = useRef(null)

	// * (3) ဒီဖန်ရှင်လေးက Form ထဲကရလာတဲ့ ဒေတာတွေကို Firebase FireStore ထဲ ထည့်သွင်းခြင်းနဲ့
	// * update ပြုလုပ်ခြင်းပဲ ဖြစ်ပါတယ်
	const handleSubmit = async () => {
		if (todos?.hasOwnProperty('timestamp')) {
			// TODO: Update Data
			const docRef = doc(db, 'chenTodos', todos.id)
			const todoUpdated = { ...todos, timestamp: serverTimestamp() }

			updateDoc(docRef, todoUpdated)

			setTodos({ title: '', details: '' })
			showAlert(
				'info',
				`အိုင်ဒီအမှတ် "${docRef.id}" အဖြစ် ဒေတာတည်းဖြတ်ခြင်း အောင်မြင်ပါသည်။`
			)
		} else {
			// TODO: Insert Data
			// * - firebase firestore ထဲမှာရှိတဲ့ collection name ကို ရယူဖို့ ကြေညာခြင်း
			const collectionRef = collection(db, 'chenTodos')

			// * - firestore ထဲကို ဒေတာထည့်သွင်းခြင်း
			const docRef = await addDoc(collectionRef, {
				...todos,
				timestamp: serverTimestamp(),
			})

			// * - ဖောင်ဖြည့်ပြီး ဒေတာထည့်သွင်းပြီးနောက် ဖောင်ထဲမှ စာသားများအား ရှင်းထုတ်လိုက်ခြင်း
			setTodos({ title: '', details: '' })

			// * - ဒေတာထည့်သွင်းမှု မှန်ကန်ကြောင်း snackbar လေးဖြင့် အသိပေးခြင်း
			showAlert(
				'success',
				`အိုင်ဒီအမှတ် "${docRef.id}" အဖြစ် ဒေတာထည့်သွင်းမှု အောင်မြင်ပါသည်။`
			)
		}
	}

	// TODO: (5) Input Area ကို Detect လုပ်ခြင်း
	useEffect(() => {
		// * ဒီဖန်ရှင်က အကယ်၍ ကိုယ်က listitem ရဲ့ အပြင်ဘက်နှိပ်မိလိုက်တဲ့အခါ
		// * input field ထဲမှာရှိတဲ့ တန်ဖိုးတွေကို နဂိုနေရာသို့ ပြန်ထားတာပဲဖြစ်တယ်
		const checkIfClickedOutside = (e) => {
			if (!inputRef.current.contains(e.target)) {
				console.log('ဖောင်အပြင်ဘက်မှ နှိပ်လိုက်ခြင်းဖြစ်သည်')
				setTodos({ title: '', details: '' })
			} else {
				console.log('ဖောင်အတွင်းဘက်မှ နှိပ်လိုက်ခြင်းဖြစ်ပါတယ်။')
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		// * ဒီကောင်က မလိုအပ်တဲ့ memory leak မဖြစ်အောင်လို့ return ပြန်ပေးပြီး
		// * event listener တွေကို ပြန်လည်ဖယ်ရှားလိုက်တာပဲဖြစ်ပါတယ်
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [])

	return (
		<div ref={inputRef}>
			{/* Form ထဲက ဒေတာတွေကို Json Output အဖြစ် ထုတ်ယူစမ်းသပ်ခြင်း */}
			{/* <pre>{JSON.stringify(todos, null, '\t')}</pre> */}
			<TextField
				value={todos.title}
				onChange={(e) => setTodos({ ...todos, title: e.target.value })}
				fullWidth
				label='Title'
				margin='normal'
				variant='outlined'
			/>
			<TextField
				value={todos.details}
				onChange={(e) => setTodos({ ...todos, details: e.target.value })}
				fullWidth
				label='Details'
				margin='normal'
				multiline
				maxRows={4}
			/>
			<Button
				onClick={handleSubmit}
				type='submit'
				fullWidth
				variant='contained'
				color='secondary'
				disabled={todos.title === '' || todos.details === ''}
				sx={{ mt: 1 }}
			>
				{todos.hasOwnProperty('timestamp') ? 'Update todo' : 'Add a new todo'}
			</Button>
		</div>
	)
}

export default TodoForm
