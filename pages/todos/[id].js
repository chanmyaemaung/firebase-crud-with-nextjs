import { db } from '@firebase/index'
import { collection, doc, getDoc, getDocs } from '@firebase/firestore'
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from 'next/link'

function Details({ todoProps }) {
	const todo = JSON.parse(todoProps)

	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{ minHeight: '100vh' }}
		>
			<Grid item xs={3}>
				<Card
					sx={{
						minWidth: 300,
						maxWidth: 500,
						boxShadow: 3,
						bgcolor: '#fafafa',
					}}
				>
					<CardActionArea>
						<CardContent>
							<Typography variant='h5'>{todo.title}</Typography>
							<Typography
								variant='p'
								component='p'
								color='text.secondary'
								sx={{ mb: 1.5 }}
							>
								{todo.details}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Link href='/'>
							<Button size='small' fullWidth>Back to home</Button>
						</Link>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	)
}

export default Details

export const getStaticPaths = async () => {
	const snapshot = await getDocs(collection(db, 'chenTodos'))

	const paths = snapshot.docs.map((doc) => {
		return {
			params: { id: doc.id.toString() },
		}
	})

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = async (context) => {
	const id = context.params.id

	const docRef = doc(db, 'chenTodos', id)
	const docSnap = await getDoc(docRef)

	return {
		props: {
			todoProps: JSON.stringify(docSnap.data() || null),
		},
	}
}
