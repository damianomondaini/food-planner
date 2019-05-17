let mongoose = require('mongoose')
let Schema = mongoose.Schema

let TodoSchema = new Schema({
    todo: {type: String, required: true}
})

module.exports = mongoose.model('Todo', TodoSchema)