let express = require('express')
let passport = require('passport')
let connect = require('connect-ensure-login')
let router = express.Router()
let user_controller = require('../controllers/user.controller')

router.get('/profile', connect.ensureLoggedIn('/users/login'), (req, res) => {
    res.render('user/profile', {user: req.user})
})

router.post('/create', user_controller.user_createdByUser, (req, res) => {
    res.redirect('/')
})
router.get('/create', (req, res) => {
    res.render('user/create')
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }), (req, res) => {
    res.redirect('/')
})
router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

router.post('/update', user_controller.user_updateByAdmin)

router.get('/:id/delete', user_controller.user_delete)

module.exports = router