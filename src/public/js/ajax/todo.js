function buildTodo(todo) {
    var todoHtml =
    '<li class="list-group-item todo__item" data-id="' +
    todo._id +
    '"><span>' +
    todo.todo +
    '</span><a href="/admin/' +
    todo._id +
    '/todo-remove"><i class="fas fa-times todo__delete"></i></a></li>'
    return todoHtml
}

$(document).ready(() => {
    $('#todo').on('submit', (e) => {
        e.preventDefault()
        var formData = $(e.target).serialize()
        $('#todo > form').trigger('reset')

        $.ajax({
            url: '/admin/todo-add',
            type: 'POST',
            data: formData
        })
        .done((data) => {
            var todo = buildTodo(data.todo)
            $('.todo__list').append(todo)
        })
    })

    $('#todo').on('click', '.todo__delete', function(e) {
        e.preventDefault()
        var todo = $(this).closest('.todo__item')
        var id = $(todo).attr('data-id')

        $.ajax({
            url: '/admin/' + id + '/todo-remove',
            type: 'GET'
        })
        .done(
            $(todo).remove()
        )
    })
})