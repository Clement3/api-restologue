const express = require('express')
const app = express()
const auth = express()

// Routes
const cartesRouter = require('./routes/cartes')
const menusRouter = require('./routes/menus')
const authRouter = require('./routes/auth')

// Define route for cartes & menus
app.use('/cartes', cartesRouter)
app.use('/', menusRouter)

// Define route for Auth Application
auth.use('/', authRouter)

// We start the Auth Api server
auth.listen(3000, () => console.log('Auth API is running : http://localhost:3000'))

// We start the Cards & Menus Server API
app.listen(4000, () => console.log('Application API is running : http://localhost:4000'))