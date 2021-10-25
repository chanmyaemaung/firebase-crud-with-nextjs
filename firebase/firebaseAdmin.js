const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccount.json')

export const verifyIdToken = (token) => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
	}
	return admin
		.auth()
		.verifyIdToken(token)
		.catch((error) => {
			throw error
		})
}
