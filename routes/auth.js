const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')

const authController = require('../controllers/authController')

// For Parsing Body x-www-form-encoded
router.use(bodyParser.urlencoded({ extended: true })); 

// Verify if the user login & password is correct
router.post('/verify', authController.verify)

// Check if the user is connected
router.get('/connected', authController.connected)

module.exports = router;