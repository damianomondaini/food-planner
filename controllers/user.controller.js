let bcrypt = require('bcrypt')
let User = require('../models/user.model')

exports.user_count = (req, res, next) => {
    User.count((err, count) => {
        if (err) throw err
        res.locals['userCount'] = count
        next()
    })
}

exports.user_delete = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            throw err
        } else {
            res.json({user: 'deleted'})
        }
    })
}

exports.user_update = (req, res) => {
    User.findById(req.body.id, (err, user) => {
        if (user.username === req.body.username) {
            if (req.body.updatePassword == 'true') {
                let password = req.body.password
                bcrypt.genSalt(12, (err, salt) => {
                    if (err) throw err
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err
                        User.findByIdAndUpdate(req.body.id, {  $set: {
                            username: req.body.username,
                            password: hash,
                            isAdmin: req.body.isAdmin
                        }}, { new: true }, (err, newUser) => {
                            if (err) throw err
                            res.json({user: newUser})
                        })
                    })
                })
            } else {
                User.findByIdAndUpdate(req.body.id, {  $set: {
                    username: req.body.username,
                    isAdmin: req.body.isAdmin
                }}, { new: true}, (err, newUser) => {
                    if (err) throw err
                    res.json({user: newUser})
                })
            }
        } else {
            User.findOne({ username: req.body.username }, (err, user) => {
                if (err) throw err
                if (user) {
                    res.json({user: 'invalid'})
                } else {
                    if (req.body.updatePassword == 'true') {
                        let password = req.body.password
                        bcrypt.genSalt(12, (err, salt) => {
                            if (err) throw err
                            bcrypt.hash(password, salt, (err, hash) => {
                                if (err) throw err
                                User.findByIdAndUpdate(req.body.id, { $set: {
                                    username: req.body.username,
                                    password: hash,
                                    isAdmin: req.body.isAdmin
                                }}, { new: true }, (err, newUser) => {
                                    if (err) throw err
                                    res.json({user: newUser})
                                })
                            })
                        })
                    } else {
                        User.findByIdAndUpdate(req.body.id, {
                            $set: {
                                username: req.body.username,
                                isAdmin: req.body.isAdmin
                            }
                        }, { new: true }, (err, newUser) => {
                            if (err) throw err
                            res.json({user: newUser})
                        })
                    }
                }
            })
        }
    })
}

exports.user_all = (req, res, next) => {
    User.find({}).sort({ isAdmin: -1, username: 1 }).exec((err, users) => {
        if (err) throw err
        res.locals['userAll'] = users
        next()
    })
}

exports.user_countAdmin = (req, res, next) => {
    User.count({ isAdmin: true }, (err, count) => {
        if (err) throw err
        res.locals['userCountAdmin'] = count
        next()
    })
}

exports.user_username = (username, cb) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return cb(null, null)
        } else {
            return cb(null, user)
        }
    })
}

exports.user_id = (id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(null, null)
        } else {
            return cb(null, user)
        }
    })
}

exports.user_createdByUser = (req, res, next) => {
    if (req.body.username && req.body.password) {
        User.findOne({ username: req.body.username}, (err, user) => {
            if (err) throw err
            if (user) {
                res.redirect('/users/create')
            } else {
                let password = req.body.password
                bcrypt.genSalt(12, (err, salt) => {
                    if (err) throw err
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err
                        let user = new User({
                            username: req.body.username,
                            password: hash
                        })
                        user.save((err) => {
                            if (err) throw err
                            next()
                        })
                    })
                })
            }
        })
    } else {
        res.redirect('/users/create')
    }
}

exports.user_createdByAdmin = (req, res, next) => {
    if (req.body.username && req.body.password && req.body.isAdmin) {
        User.findOne({ username: req.body.username}, (err, user) => {
            if (err) throw err
            if (user) {
                res.json({user: 'invalid'})
            } else {
                let password = req.body.password
                bcrypt.genSalt(12, (err, salt) => {
                    if (err) throw err
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err
                        let user = new User({
                            username: req.body.username,
                            password: hash,
                            isAdmin: req.body.isAdmin
                        })
                        user.save((err, user) => {
                            if (err) throw err
                            res.json({user: user})
                        })
                    })
                })
            }
        })
    } else {
        res.json({user: 'invalid'})
    }
}