// MongoDB Atlas database set up

let mongoose = require('mongoose')
let mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useFindAndModify: false
})
mongoose.Promise = global.Promise
