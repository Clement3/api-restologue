const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const carteController = require('../controllers/carteController')

// For Parsing Body x-www-form-encoded
router.use(bodyParser.urlencoded({ extended: true }))

// Return all cards
router.get('/all', carteController.index)

// Add new card
router.post('/add', carteController.add)

// Get card by id (:id = req.params.id)
router.get('/:id/show', carteController.show)

// Delete card by id
router.delete('/:id/delete', carteController.destroy)

module.exports = router