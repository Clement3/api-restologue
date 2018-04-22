const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const menuController = require('../controllers/menuController')

// For Parsing Body x-www-form-encoded
router.use(bodyParser.urlencoded({ extended: true }))

// Return all menus
router.get('/menus/all', menuController.indexMenus)

// Return all menus for carteId
router.get('/:carteId/menus/all', menuController.IndexMenusOnCart)

// Add a menu to a carteId
router.post('/:carteId/menus/add', menuController.addMenusToCarte)

// Delete all menu from a carteId
router.delete('/:carteId/menus/destroy', menuController.destroyAllMenusToCarte)

// Return a menu from menuId
router.get('/menus/:menuId/show', menuController.showMenu)

// Delete a menu from a menuId
router.get('/menus/:menuId/destroy', menuController.destroyMenu)

// Update a menu from a menuId
router.put('/menus/:menuId/update', menuController.updateMenu)

module.exports = router;
