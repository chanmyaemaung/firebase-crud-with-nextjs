import { IconButton, ListItem, ListItemText } from '@mui/material'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '@firebase/index'
import { useContext } from 'react'
import { TodoContext } from '@context/MyTodoContext'
import { useRouter } from 'next/router'

function Todo({ id, title, details, timestamp }) {
	// * Context Api ထဲက သတ်မှတ်ထားခဲ့ထဲ့ ဖန်ရှင်ကို ပြန်ခေါ်သုံးထားခြင်း
	const { showAlert, setTodos } = useContext(TodoContext)

	const router = useRouter()

	// TODO: ဒေတာဖျက်ဖို့
	const deleteTodo = async (id, e) => {
		e.stopPropagation()

		// * - ဒီအကြောင်းလေးက firestore ထဲက collection ထဲကမှ document တစ်ခုချင်းစီရဲ့
		// * - အိုင်ဒ်ကို ရလာအောင် ရေးသားထားခြင်းဖြစ်ပါတယ်
		const docRef = doc(db, 'chenTodos', id)

		// * - သက်ရောက်နေတဲ့ document ကို ဖျက်ပစ်ရန်
		await deleteDoc(docRef)

		// * - ဖျက်ပစ်ခြင်းအောင်မြင်ကြောင်း snackbar လေးဖြင့် အသိပေးခြင်း
		showAlert(
			'error',
			`အိုင်ဒီအမှတ် "${docRef.id}" အဖြစ် ဒေတာဖျက်ပစ်ခြင်း အောင်မြင်ပါသည်။`
		)
	}

	// * သက်ဆိုင်ရာ အိုင်ဒီအလိုက် ပိုစ့်ကိုကြည့်နိုင်အောင်
	const seeMore = (id, e) => {
		e.stopPropagation()

		router.push(`/todos/${id}`)
	}

	return (
		<ListItem
			onClick={() => setTodos({ id, title, details, timestamp })}
			secondaryAction={
				<>
					{/* နှိပ်လိုက်ရင် လက်ရှိရောက်နေတဲ ့ဒေတာကို ဖျက်ဖို့ */}
					<IconButton
						onClick={(e) => deleteTodo(id, e)}
						color='error'
						title='ဖျက်ပစ်ဖို့'
					>
						<DeleteIcon />
					</IconButton>
					{/* နှိပ်လိုက်ရင် လက်ရှိရောက်နေတဲ ့ဒေတာကို ပြင်ဆင်ဖို့ */}
					<IconButton
						onClick={(e) => seeMore(id, e)}
						color='info'
						title='ပြင်ဆင်ဖို့'
					>
						<MoreVertIcon />
					</IconButton>
				</>
			}
			sx={{ mt: 3, boxShadow: 3, bgcolor: '#FAFAFA' }}
		>
			<ListItemText primary={title} secondary={moment(timestamp).calendar()} />
		</ListItem>
	)
}

export default Todo
