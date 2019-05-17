let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

var requiresAdmin = () => {
    return [
        ensureLoggedIn('/users/login'),
        function (req, res, next) {
            if (req.user && req.user.isAdmin === true)
                next()
            else
                res.status(401).send('Unauthorized')
        }
    ]
}

module.exports = requiresAdmin