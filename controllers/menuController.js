var data = require('../data')

let id = 0

// Liste les menus
exports.indexMenus = function (req, res) {
		// On parcours le tableau [listeDeCartes]
		for (let i in data.listeDeCartes) {
				// On parcours le tableau [menus] dans le tableau [listeDeCartes]
				for (let k in data.listeDeCartes[i].menus) {
						// On retourne un à status [200] (OK) est on passe en json qui contient
						// un objet [data]
						return res.status(200).json({ data: data.listeDeCartes[i].menus })
				}
		}

		// On retourne un à status [404] (Not Found) est on passe en json qui contient
		// un objet [message]
		return res.status(404).json({ message: "Aucune cartes." })
}

// Liste des menus d'une carte
exports.IndexMenusOnCart = function (req, res) {
		// On parcours le tableau [listeDeCartes]
		for (let i in data.listeDeCartes) {
				// Si dans le tableau [listeDeCartes] à l'index [i],
				// [id] est égale à aux paramètres [carteId] on continue
				if (data.listeDeCartes[i].id == req.params.carteId) {
						// On retourne un à status [200] (OK) est on passe en json qui contient
						// un objet [data]
						return res.status(200).json({ data: data.listeDeCartes[i].menus })
				}
		}

		// On retourne un à status [404] (Not Found) est on passe en json qui contient
		// un objet [message]
		return res.status(404).json({ message: "Cet carte n'existe pas" })
}

// Ajoute un menu à une carte
// Method : Post
// Paramètres [carteId] (int)
exports.addMenusToCarte = function (req, res) {
		// On parcours le tableau [listeDeCartes]
		for (let i in data.listeDeCartes) {
				// Si dans le tableau [listeDeCartes] à l'index [i],
				// [id] est égale à aux paramètres [carteId] on continue
				if (data.listeDeCartes[i].id == req.params.carteId) {
						// On map notre objet
						menu = {
								id: id++,
								nom: req.body.nom,
								entree: {
										nom: req.body.entree_nom,
										prix: req.body.entree_prix
								},
								plat: {
										nom: req.body.plat_nom,
										prix: req.body.plat_prix
								},
								dessert: {
										nom: req.body.dessert_nom,
										prix: req.body.dessert_prix
								}
						}

						// On ajoute dans notre [menus] à l'index [i] dans le tableau [listeDeCartes]
						data.listeDeCartes[i].menus.push(menu)

						// On retourne un status [201] (Created) dans un json qui contient
						// un objet [data] avec l'id dans notre objet [menu]
						return res.status(201).json({ data: menu.id })
				}
		}

		// On retourne un à status [404] (Not Found) est on passe en json qui contient
		// un objet [message]
		return res.status(404).json({ message: "Cet carte n'existe pas" })
}

// Détruit un menu dans une carte
// Method : delete
// Paramètres [carteId] (int)
exports.destroyMenusToCarte = function (req, res) {
		// On parcours le tableau [listeDeCartes]
		for (let i in data.listeDeCartes) {

				// Si dans le tableau [listeDeCartes] à l'index [i],
				// l'[id] est égale aux paramètres [carteId] on continue
				if (data.listeDeCartes[i].id == req.params.carteId) {
						// On utlise la fonction [splice] qui démarre à 0 et qui se termine
						// à la longueur de notre tableau [menus] à l'index [i] dans notre tableau [listeDeCartes]
						// pour supprimer le contenu du tableau
						data.listeDeCartes[i].menus.splice(0, data.listeDeCartes[i].menus.length)
				}
		}

		// On retourne un à status [404] (Not Found) est on passe en json qui contient
		// un objet [message]
		return res.status(404).json({ message: "Cet carte n'existe pas" })
}

// Affiche un menu
// Method : get
// Paramètres [menuId]
exports.showMenu = function (req, res) {
		// On parcours le tableau [listeDeCartes]
		for (let i in data.listeDeCartes) {

				// On parcours le tableau [menus] à l'index [i] dans notre tableau [listeDeCartes]
				for (let k in data.listeDeCartes[i].menus) {

						// Si dans le tableau [listeDeCartes] à l'index [k],
						// l'[id] est égale aux paramètres [menuId] on continue
						if (data.listeDeCartes[i].menus[k].id == req.params.menuId) {
								// On retourne un status [200] (OK) avec un json qui contient
								// un objet [data]
								// A teste : Enlever la boucle avec l'index K et juste retourner les menus
								return res.status(200).json({ data:  data.listeDeCartes[i].menus[k] })
						}
				}

				// On retourne un à status [404] (Not Found) est on passe en json qui contient
				// un objet [message]
				return res.status(404).json({ message: "Ce menu n'existe pas" })
		}

		// On retourne un à status [404] (Not Found) est on passe en json qui contient
		// un objet [message]
		return res.status(404).json({ message: "Cet carte n'existe pas" })
}

// Supprime un menus
// Method : delete
// Paramètres [menuId]
exports.destroyMenu = function (req, res) {
		for (let i in data.listeDeCartes) {
				for (let k in data.listeDeCartes[i].menus) {
						if (data.listeDeCartes[i].menus[k].id == req.params.menuId) {
								data.listeDeCartes[i].menus.splice(k, 0)
								return res.status(200).json({ message: "Menu supprimer avec success." })
						}
				}
		}

		return res.status(404).json({ message: "Aucune cartes" })
}

// Modifie un menus
// Method : put
// Paramètres [menuId]
exports.updateMenu = function (req, res) {
		for (let i in data.listeDeCartes) {
				for (let k in data.listeDeCartes[i].menus) {
						if (data.listeDeCartes[i].menus[k].id == req.params.menuId) {

								data.listeDeCartes[i].menus[k] = {
										id: id++,
										nom: req.body.nom,
										entree: {
												nom: req.body.entree_nom,
												prix: req.body.entree_prix
										},
										plat: {
												nom: req.body.plat_nom,
												prix: req.body.plat_prix
										},
										dessert: {
												nom: req.body.dessert_nom,
												prix: req.body.dessert_prix
										}
								}

								return res.status(200).json({ message: "Menu édité avec success" })
						}
				}

				return res.status(404).json({ message: "Aucun menus" })
		}

		return res.status(404).json({ message: "Aucune cartes" })
}
