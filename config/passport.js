// PasseportJS setup for user authentification
// Using bcrypt for hash and salt

let passport = require('passport')
let Strategy = require('passport-local').Strategy
let bcrypt = require('bcrypt')

let user_controller = require('../controllers/user.controller')

passport.use(new Strategy(
    (username, password, cb) => {
        user_controller.user_username(username, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        return cb(err)
                    } else if (res) {
                        cb(null, user)
                    } else {
                        return cb(null, false)
                    }
                })
            } else {
                return cb(null, false)
            }
        })
    }
))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    user_controller.user_id(id, (err, user) => {
        if (err) {
            return cb(err)
        }
        cb(null, user)
    })
})