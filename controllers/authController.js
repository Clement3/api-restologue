var data = require('../data')

exports.verify = function (req, res) {
    if (req.body.username === data.users.username && req.body.password === data.users.password) {
        data.users.connected = true;

        return res.status(200).json({ message: 'Connexion réussie.'})
    }

    return res.status(401).json({ message: "Mauvais identifiant." })
}

exports.connected = function (req, res) {
    if (data.users.connected) {
        return res.status(200).json({ message: "Vous êtes bien connecté." })
    }

    return res.status(401).json({ message: "Vous n'êtes pas connecté." })
}
