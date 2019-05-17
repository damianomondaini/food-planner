let express = require('express')
let router = express.Router()
let user_controller = require('../controllers/user.controller')
let todo_controller = require('../controllers/todo.controller')

router.get('/', user_controller.user_count, todo_controller.todo_all, (req, res) => {
    res.render('admin/dashboard', { data: res.locals, board: 'main', user: req.user.username })
})

router.get('/users', user_controller.user_all, (req, res) => {
    res.render('admin/dashboard', { data: res.locals, board: 'users', user: req.user.username })
})

router.post('/todo-add', todo_controller.todo_create)
router.get('/:id/todo-remove', todo_controller.todo_delete)

router.post('/user-create', user_controller.user_createdByAdmin)

module.exports = router