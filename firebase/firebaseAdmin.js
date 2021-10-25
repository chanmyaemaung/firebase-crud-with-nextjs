const admin = require('firebase-admin')
// const serviceAccount = require('./serviceAccount.json')

const service_account = process.env.NEXT_PUBLIC_SERVICE_ACCOUNT

// console.log(service_account)

export const verifyIdToken = (token) => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(service_account),
		})
	}
	return admin
		.auth()
		.verifyIdToken(token)
		.catch((error) => {
			throw error
		})
}
