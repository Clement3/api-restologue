var userModel = require('../models/User')
var randomToken = require('rand-token');

// User = our data stored in userModel.data
let	User = userModel.data

/* Permet de se connecté
 * Method : POST
 * Request : body
 * Data : { username, password }
 */
exports.login = function (req, res) {
	for (let i in User) {
		if (req.body.username === User[i].username && req.body.password === User[i].password) {
			let token = randomToken.generate(42)
			User[i].connected = true
			User[i].auth_token = token
			return res.status(200).json({ data: token })
		}
		return res.status(404).json({ message: 'Pseudo ou mot de passe invalide.' })
	}
	return res.status(404).json({ message: 'Aucun utilisateurs.' })
}

/* Permet de se deconnecté
 * Method : GET
 * Request : query
 * Data : token
 */
exports.logout = function (req, res) {
	for (let i in User) {
		if (req.query.token === User[i].auth_token) {
			User[i].connected = false
			User[i].auth_token = ''
			return res.status(200).json({ message: 'Déconnexion réussie.' })
		}
		return res.status(404).json({ message: 'Ce token n\'existe pas.' })
	}
	return res.status(404).json({ message: 'Aucun utilisateurs.' })
}

/* Vérifie si l'utilisateur est connecté
 * Method : GET
 * Request : query
 * Data : token
 */
exports.connected = function (req, res) {
	for (let i in User) {
		if (req.query.token === User[i].auth_token) {
			if (User[i].connected) {
				return res.status(200).json({ message: 'Connectée.' })
			}
			return res.status(401).json({ message: 'Pas connectée.' })
		}
		return res.status(404).json({ message: 'Ce token n\'existe pas.' })
	}
	return res.status(404).json({ message: 'Aucun utilisateurs.' })
}
