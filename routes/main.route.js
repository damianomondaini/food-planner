let express = require('express')
let connect = require('connect-ensure-login')
let multer = require('multer')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img/temp/')
    },
    filename: function (req, file, cb) {
        ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
        cb(null, Date.now() + ext)
    }
})
var upload = multer({ storage: storage })
let router = express.Router()

let main_controller = require('../controllers/main.controller')
let category_controller = require('../controllers/category.controller')
let recipe_controller = require('../controllers/recipe.controller')
let drive = require('../middleware/drive')

router.get('/', connect.ensureLoggedIn('/users/login'), (req, res) => {
    res.render('main/index')
})

router.get('/swipe', (req, res) => {
    res.render('main/swipe')
})

router.get('/me', category_controller.category_all, (req, res) => {
    res.render('main/me', {data: res.locals})
})

router.post('/me/recipe-add', upload.single('image'), drive.uploadImage, recipe_controller.recipe_create, (req, res) => {
    console.log('----------------------------');
    console.log('----------------------------');
    console.log('DONE');
    console.log('----------------------------');
    console.log('----------------------------');
})

router.get('/test', (req, res) => {
    res.render('main/test')
})

router.post('/test', /*upload.single('name'),*/ (req, res) => {
    console.log(req.file);
})

module.exports = router