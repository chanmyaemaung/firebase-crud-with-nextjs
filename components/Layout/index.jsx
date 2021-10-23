import Head from 'next/head'
import { Container, Typography } from '@mui/material'
import Link from '@mui/material/Link'

function Layout({ title, keywords, description, children }) {
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<meta charSet='utf-8' />
				<meta name='keywords' content={keywords} />
				<meta name='description' content={description} />
				<link rel='icon' href='/favicon.ico' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
				<title>{title}</title>
			</Head>
			<Container maxWidth='sm'>
				<Typography
					component='h5'
					variant='h5'
					textAlign='center'
					color='primary'
				>
					<Link
						href='https://facebook.com/chanlaymcmm'
						underline='none'
						rel='noreferrer'
						target='_blank'
						title='ကျွန်တော့်ရဲ့ Social Media သို့ အလည်လာနိုင်ပါသည်'
					>
						PJK - DEV
					</Link>
				</Typography>
				<Typography
					component='p'
					variant='caption'
					textAlign='center'
					color='secondary'
				>
					(Firebase V9 - CRUD)
				</Typography>
				{children}
			</Container>
		</>
	)
}

Layout.defaultProps = {
	title: 'Chen - TODO',
	keywords: 'chenlay, todolist, todoapp, firebase, crud',
	description:
		'This is an ToDo app build with Next Js and the latest technology of firebase using version v9 with CRUD functionality.',
}

export default Layout
