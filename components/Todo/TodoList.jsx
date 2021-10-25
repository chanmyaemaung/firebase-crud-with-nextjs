import { db } from '@firebase/index'
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from '@firebase/firestore'
import { useEffect, useState } from 'react'
import Todo from './Todo'
import { useAuth } from '@context/Auth'

function TodoList({ todoProps }) {
	const [todos, setTodos] = useState([])

	// * Auth Context ကိုခေါ်သုံးခြင်း
	const { currentUser } = useAuth()

	// * ဒီဟာလေးက Server side ကနေ လာတာပါ
	useEffect(() => {
		setTodos(JSON.parse(todoProps))
	}, [])

	// TODO: စာမျက်နှာ စစဖွင့်ခြင်း Run နေစေဖို့ပဲဖြစ်ပါတယ်။
	// TODO: - တစ်နည်းအားဖြင့် Firebase Firestore ထဲက ဒေတာတွေကို လှမ်းယူပြသဖို့ပဲ ဖြစ်ပါတယ်။
	useEffect(() => {
		// * (1) - firebase firestore ထဲမှာရှိတဲ့ collection name ကို ရယူဖို့ ကြေညာခြင်း
		const collectionRef = collection(db, 'chenTodos')

		// * (2) - collection ထဲက ဒေတာတွေကို နောက်ဆုံးဒေတာကို
		// * - ထိပ်ဆုံးပြနိုင်ဖို့ရန် query ဖြင့် အသုံးပြုခြင်း
		const q = query(
			collectionRef,
			where('email', '==', currentUser?.email),
			orderBy('timestamp', 'desc')
		)

		// * (3) firestore ထဲက ဒေတာတွေရလာဖို့ realtime subscription အသုံးပြုခြင်း
		// * - တစ်နည်းအားဖြင့် cleanup function တစ်ခုပါ တည်ဆောက်ထားခြင်းဖြစ်သည်။
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			// * ရလာတဲ့ ဒေတာတွေကို setTodo ထဲထည့်သွင်းလိုက်ခြင်း
			setTodos(
				querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
					timestamp: doc.data().timestamp?.toDate().getTime(), // * firebase timestamp ကို ဖတ်လို့ရအောင် ပြုပြင်ထားခြင်းဖြစ်သည်။
				}))
			)
		})

		// * ဒါလေးက အရေးကြီးတယ်။ Memory Leak မဖြစ်အောင် return ပြန်ပေးထားတာပါ။
		return unsubscribe
	}, [])

	return (
		<>
			{/* ရလာတဲ့ ဒေတာတွေကို props အဖြစ်ပြောင်းပြီး တစ်ဖက်က Todo Component ဆီပေးပို့ခြင်း */}
			{todos.map(({ id, title, details, timestamp }) => (
				<Todo
					key={id}
					id={id}
					title={title}
					details={details}
					timestamp={timestamp}
				/>
			))}
		</>
	)
}

export default TodoList
