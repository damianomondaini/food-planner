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
        user = process.env.ANONYMOUS_USER
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
        Recipe.findById(recipe._id).populate('category').exec((err, recipe) => {
            if (err) throw err
            res.json(recipe)
        })
    })
}

exports.recipe_delete = (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err) => {
        if (err) throw err
        res.json(true)
    })
}

exports.recipe_all = (req, res, next) => {
    let currentUser
    if (req.user) {
        currentUser = req.user._id
    } else {
        currentUser = process.env.ANONYMOUS_USER
    }
    Recipe.find({ user: currentUser }).populate('category').exec((err, recipes) => {
        if (err) throw err
        console.log(recipes)
        res.locals['recipes'] = recipes
        next()
    })
}