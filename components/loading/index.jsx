import { Grid } from '@mui/material'
import ReactLoading from 'react-loading'

function Loading({ type, color }) {
	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{ minHeight: '100vh' }}
		>
			<ReactLoading type={type} color={color} width={'20%'} height={'20%'} />
		</Grid>
	)
}

export default Loading
