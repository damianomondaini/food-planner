let mongoose = require('mongoose')
let Schema = mongoose.Schema

let RecipeSchema = new Schema({
    name: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    imageId: {type: String, required: true},
    isCheatMeal: {type: Boolean, required: true},
    serving: {type: Number, required: true},
    ingredients: {type: Array, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Recipe', RecipeSchema)