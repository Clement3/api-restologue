const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const carteController = require('../controllers/carteController')

// For Parsing Body x-www-form-encoded
router.use(bodyParser.urlencoded({ extended: true }))

// Return all cards
router.get('/all', carteController.index)

<<<<<<< HEAD
// Add new card
=======
// Create a new card
>>>>>>> 9843a5687624debb570b3c3368d5743e77a4a6bc
router.post('/create', carteController.create)

// Get card by id (:id = req.params.id)
router.get('/:id/show', carteController.show)

<<<<<<< HEAD
// Get card by id (:id = req.params.id)
router.put('/:id/edit', carteController.edit)
=======
// Update card by id (:id = req.params.id)
router.put('/:id/update', carteController.update)
>>>>>>> 9843a5687624debb570b3c3368d5743e77a4a6bc

// Delete card by id
router.delete('/:id/delete', carteController.destroy)

module.exports = router
