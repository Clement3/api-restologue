const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const carteController = require('../controllers/carteController')

// For Parsing Body x-www-form-encoded
router.use(bodyParser.urlencoded({ extended: true }))

// Return all cards
router.get('/all', carteController.index)

// Create a new card
router.post('/create', carteController.create)

// Get card by id (:id = req.params.id)
router.get('/:id/show', carteController.show)

// Update card by id (:id = req.params.id)
router.put('/:id/update', carteController.update)

// Delete card by id
router.delete('/:id/delete', carteController.destroy)

module.exports = router