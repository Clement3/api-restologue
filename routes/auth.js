const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')

const authController = require('../controllers/authController')

// For Parsing Body x-www-form-encoded
router.use(bodyParser.urlencoded({ extended: true }));

// Verify if the user login & password is correct
router.post('/login', authController.login)

// Check if the user is connected
router.get('/connected', authController.connected)

// Deconnect the user
router.get('/logout', authController.logout)

module.exports = router;
