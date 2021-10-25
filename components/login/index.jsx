import { Button, Grid } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { signInWithPopup } from '@firebase/auth'
import { auth, provider } from '@firebase/index'

function LoginWithGoogle() {
	const loginWithGoogle = () => {
		signInWithPopup(auth, provider)
	}

	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{ minHeight: '100vh' }}
		>
			<Button
				onClick={(loginWithGoogle)}
				variant='contained'
				startIcon={<GoogleIcon />}
			>
				Sign in with Google
			</Button>
		</Grid>
	)
}

export default LoginWithGoogle
