let express = require('express')
let connect = require('connect-ensure-login')
let router = express.Router()

let main_controller = require('../controllers/main.controller')

router.get('/', connect.ensureLoggedIn('/users/login'), (req, res) => {
    res.render('main/index')
})

router.get('/test', (req, res) => {
    res.render('main/test')
})

module.exports = router