let fs = require('fs')
let Recipe = require('../models/recipe.model')

exports.recipe_create = (req, res, next) => {
    let name = req.body.name
    let category = req.body.category
    let isCheatMeal = req.body.isCheatMeal
    let serving = req.body.serving
    let ingredients = JSON.parse(req.body.ingredients)
    let imageId = res.locals.imageId
    let user

    if (req.user === undefined) {
        user = '5cdeaebb1c9d440000ed9427'
    } else {
        user = req.user._id
    }

    let recipe = new Recipe({
        name: name,
        category: category,
        imageId: imageId,
        isCheatMeal: isCheatMeal,
        serving: serving,
        ingredients: ingredients,
        user: user
    })

    recipe.save((err, recipe) => {
        if (err) throw err
        res.json(recipe)
    })

    next()
}