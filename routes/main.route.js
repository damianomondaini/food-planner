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

let category_controller = require('../controllers/category.controller')
let recipe_controller = require('../controllers/recipe.controller')
let drive = require('../middleware/drive')

router.get('/', recipe_controller.recipe_all, category_controller.category_all, (req, res) => {
    res.render('main/index', {data: res.locals})
})

router.get('/swipe', (req, res) => {
    res.render('main/swipe')
})


router.post('/me/recipe-add', upload.single('image'), drive.uploadImage, recipe_controller.recipe_create)
router.post('/me/:id/recipe-remove', drive.deleteImage, recipe_controller.recipe_delete)

router.get('/test', (req, res) => {
    res.render('main/test')
})

module.exports = router