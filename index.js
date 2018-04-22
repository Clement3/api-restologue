const express = require('express')
const cors = require('cors')
const app = express()
const auth = express()

// Import Routes
const cartesRouter = require('./routes/cartes')
const menusRouter = require('./routes/menus')
const authRouter = require('./routes/auth')

// Define route for cartes & menus
app.use('/api/cartes', [cors(), cartesRouter, menusRouter])

// Define route for Auth Application
auth.use('/api/auth', [cors(), authRouter])

// On démarre l'application Auth
auth.listen(3000, () => console.log('Auth API is running : http://localhost:3000'))

// On démarre les applications Cartes & Menus
app.listen(4000, () => console.log('Application API is running : http://localhost:4000'))
