import { useAuth } from '@context/Auth'
import { auth } from '@firebase/index'
import { Avatar, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'

function Profile() {
	const { currentUser } = useAuth()

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<IconButton onClick={() => auth.signOut()}>
				<Avatar src={currentUser?.photoURL} />
			</IconButton>
			<Typography variant='h5'>{currentUser.displayName}</Typography>
		</Box>
	)
}

export default Profile
