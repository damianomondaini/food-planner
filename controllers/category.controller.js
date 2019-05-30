let Category = require('../models/category.model')

exports.category_all = (req, res, next) => {
    Category.find((err, categories) => {
        if (err) throw err
        res.locals['categories'] = categories
        next()
    })
}