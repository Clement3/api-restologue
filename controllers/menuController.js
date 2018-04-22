var carteModel = require('../models/Carte')

// Pour écrire moins, on stock le model dans la variable Carte
let Carte = carteModel.data

// Pour générer [id] qu'on incrémente. Commence à 1 car on stock déjà des données
// teste dans notre model
let id = 1

// Liste les menus
exports.indexMenus = function (req, res) {
	// On parcours le tableau [listeDeCartes]
	for (let i in Carte) {
		// On parcours le tableau [menus] dans le tableau [listeDeCartes]
		for (let k in Carte[i].menus) {
			// On retourne un à status [200] (OK) est on passe en json qui contient
			// un objet [data]
			return res.status(200).json({ data: Carte[i].menus })
		}
	}

	// On retourne un à status [404] (Not Found) est on passe en json qui contient
	// un objet [message]
	return res.status(404).json({ message: 'Aucune cartes.' })
}

// Liste des menus d'une carte
exports.IndexMenusOnCart = function (req, res) {
	// On parcours le tableau [listeDeCartes]
	for (let i in Carte) {
		// Si dans le tableau [listeDeCartes] à l'index [i],
		// [id] est égale à aux paramètres [carteId] on continue
		if (Carte[i].id == req.params.carteId) {
			// On retourne un à status [200] (OK) est on passe en json qui contient
			// un objet [data]
			return res.status(200).json({ data: Carte[i].menus })
		}
		return res.status(404).json({ message: 'Impossible de trouver cet carte.' })
	}

	// On retourne un à status [404] (Not Found) est on passe en json qui contient
	// un objet [message]
	return res.status(404).json({ message: 'Aucune cartes.' })
}

// Ajoute un menu à une carte
// Method : Post
// Paramètres [carteId] (int)
exports.addMenusToCarte = function (req, res) {
	// On parcours le tableau [listeDeCartes]
	for (let i in Carte) {
		// Si dans le tableau [listeDeCartes] à l'index [i],
		// [id] est égale à aux paramètres [carteId] on continue
		if (Carte[i].id === req.params.carteId) {
			let generateId = id++;
			// On map notre objet
			let menuSchema = {
				id: generateId.toString(),
				nom: req.body.nom,
				entree: {
						entree_nom: req.body.entree_nom,
						entree_prix: req.body.entree_prix
				},
				plat: {
						plat_nom: req.body.plat_nom,
						plat_prix: req.body.plat_prix
				},
				dessert: {
						dessert_nom: req.body.dessert_nom,
						dessert_prix: req.body.dessert_prix
				}
			}
			// On ajoute dans notre [menus] à l'index [i] dans le tableau [listeDeCartes]
			Carte[i].menus.push(menuSchema)
			// On retourne un status [201] (Created) dans un json qui contient
			// un objet [data] avec l'id dans notre objet [menu]
			return res.status(201).json({ data: menuSchema.id })
		}
		return res.status(404).json({ message: 'Impossible de trouver cet carte.' })
	}
	// On retourne un à status [404] (Not Found) est on passe en json qui contient
	// un objet [message]
	return res.status(404).json({ message: 'Aucune cartes.' })
}

// Détruit un menu dans une carte
// Method : delete
// Paramètres [carteId] (int)
exports.destroyAllMenusToCarte = function (req, res) {
	// On parcours le tableau [listeDeCartes]
	for (let i in Carte) {
		// Si dans le tableau [listeDeCartes] à l'index [i],
		// l'[id] est égale aux paramètres [carteId] on continue
		if (Carte[i].id === req.params.carteId) {
			// On utlise la fonction [splice] qui démarre à 0 et qui se termine
			// à la longueur de notre tableau [menus] à l'index [i] dans notre tableau [listeDeCartes]
			// pour supprimer le contenu du tableau
			Carte[i].menus.splice(0, Carte[i].menus.length)
		}
		return res.status(404).json({ message: 'Impossible de trouver cet carte.' })
	}

	// On retourne un à status [404] (Not Found) est on passe en json qui contient
	// un objet [message]
	return res.status(404).json({ message: 'Aucune cartes.' })
}

// Affiche un menu
// Method : get
// Paramètres [menuId]
exports.showMenu = function (req, res) {
	// On parcours le tableau [listeDeCartes]
	for (let i in Carte) {
		// On parcours le tableau [menus] à l'index [i] dans notre tableau [listeDeCartes]
		for (let k in Carte[i].menus) {
			// Si dans le tableau [listeDeCartes] à l'index [k],
			// l'[id] est égale aux paramètres [menuId] on continue
			if (Carte[i].menus[k].id === req.params.menuId) {
				// On retourne un status [200] (OK) avec un json qui contient
				// un objet [data]
				// A teste : Enlever la boucle avec l'index K et juste retourner les menus
				return res.status(200).json({ data:  Carte[i].menus[k] })
			}
			return res.status(404).json({ message: 'Impossible de trouver un menu avec cet id.' })
		}
		// On retourne un à status [404] (Not Found) est on passe en json qui contient
		// un objet [message]
		return res.status(404).json({ message: 'Aucun menus.' })
	}
	// On retourne un à status [404] (Not Found) est on passe en json qui contient
	// un objet [message]
	return res.status(404).json({ message: 'Aucune cartes.' })
}

// Supprime un menus
// Method : delete
// Paramètres [menuId]
exports.destroyMenu = function (req, res) {
	for (let i in Carte) {
		for (let k in Carte[i].menus) {
			if (Carte[i].menus[k].id === req.params.menuId) {
				Carte[i].menus.splice(k, 0)
				return res.status(200).json({ message: 'Le menu à été supprimer.' })
			}
			return res.status(404).json({ message: 'Impossible de trouver un menu avec cet id.' })
		}
		return res.status(404).json({ message: 'Aucun menus.' })
	}
	return res.status(404).json({ message: 'Aucune cartes.' })
}

// Modifie un menus
// Method : put
// Paramètres [menuId]
exports.updateMenu = function (req, res) {
	for (let i in Carte) {
		for (let k in Carte[i].menus) {
			if (Carte[i].menus[k].id === req.params.menuId) {
				Carte[i].menus[k] = {
					nom: req.body.nom,
					entree: {
							entree_nom: req.body.entree_nom,
							entree_prix: req.body.entree_prix
					},
					plat: {
							plat_nom: req.body.plat_nom,
							plat_prix: req.body.plat_prix
					},
					dessert: {
							dessert_nom: req.body.dessert_nom,
							dessert_prix: req.body.dessert_prix
					}
				}
				return res.status(200).json({ message: 'Le menu à bien été éditer.' })
			}
			return res.status(404).json({ message: 'Impossible de trouver un menu avec cet id.' })
		}
		return res.status(404).json({ message: 'Aucun menus.' })
	}
	return res.status(404).json({ message: 'Aucune cartes.' })
}
