// Require for every package or file
let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')
let passport = require('passport')

require('dotenv').config()
require('./config/db')

let requiresAdmin = require('./middleware/requires-admin')

let main = require('./routes/main.route')
let user = require('./routes/user.route')
let admin = require('./routes/admin.route')

let app = express()

// EJS as view engine
app.set('view engine', 'ejs')

// Using our packages
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cookieParser('foo'))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

// Setup for passportJS
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

// Use middleware
app.use('/admin', requiresAdmin())
app.all('/admin/*', requiresAdmin())

// Routes
app.use('/src', express.static('src'))
app.use('/', main)
app.use('/users', user)
app.use('/admin', admin)

app.listen(process.env.PORT)