var updatePassword = false
var user
var username
var isAdmin
var id

function htmlencode(str) {
    return str.replace(/[&<>"']/g, function($0) {
        return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
    });
}

$('.update-editPassword').on('click', () => {
    let passwordGroup = $('.update-password')
    if ($("input[name='updatePassword']").prop("checked") === true) {
        passwordGroup.css('display', 'block')
    } else {
        passwordGroup.css('display', 'none')
    }
})


$('.delete-button').on('click', () => {
    $.ajax({
            url: '/users/' + id + '/delete',
            type: 'GET'
        })
        .done((data) => {
            if (data.user === 'deleted') {
                user.remove()
            } else {
                alert('Error while deleting user')
            }
        })
})

function buildUser(user) {
    var userHtml =
    '<tr class="user" data-id="' +
    htmlencode(user._id.toString()) +
    '"><td><button onclick="updateUser()" class="btn btn-primary update-user" data-toggle="modal" data-target="#userUpdate"><i class="fas fa-user-edit"></i></button></td><td>' +
    htmlencode(user.username.toString()) +
    '</td><td>' +
    htmlencode(user.isAdmin.toString()) +
    '</td></tr>'
    return userHtml
}

$('.create-button').on('click', () => {
    var formData =
    'username=' +
    $("input[name='usernameNew']").val() +
    "&isAdmin=" +
    $("input[name='isAdminNew']:checked").val() +
    "&password=" +
    $("input[name='passwordNew']").val()

    $("input[name='usernameNew']").val('')
    $("input[name='passwordNew']").val('')
    $("input[id='userNew']").click()
    $.ajax({
        url: '/admin/user-create',
        type: 'POST',
        data: formData
    })
    .done((data) => {
        if (data.user === 'invalid') {
            alert('Error while creating user')
        } else {
            var user = buildUser(data.user)
            $('.users__tbody').append(user)
        }
    })
})

function updateUser() {
    user = $(window.event.target).closest('.user')
    username = user.children().eq(1).text()
    isAdmin = user.children().eq(2).text()
    id = user.attr('data-id')

    $('span.user-name').text(username)
    $('input#id').attr('placeholder', id)
    $('input#username').val(username)
    if (isAdmin === 'true') {
        $('input#admin').click()
    } else {
        $('input#user').click()
    }
    if ($("input[name='updatePassword']").prop("checked") === true) {
        $("input[name='updatePassword']").click()
    }
    $('input#password').val('')
}

$('.update-button').on('click', () => {
    if ($("input[name='updatePassword']").prop("checked") === true) {
        updatePassword = true
    } else {
        updatePassword = false
    }
    var formData =
    'id=' +
    $('input#id').attr('placeholder') +
    '&username=' +
    $('input#username').val() +
    '&isAdmin=' +
    $("input[name='isAdmin']:checked").val() +
    '&updatePassword=' +
    updatePassword
    if (updatePassword) {
        formData += '&password=' + $('input#password').val()
    }
    $.ajax({
            url: '/users/update',
            type: 'POST',
            data: formData
        })
        .done((data) => {
            if (data.user != 'invalid') {
                user.children().eq(1).text(data.user.username)
                user.children().eq(2).text(data.user.isAdmin)
            } else {
                alert('Username aleready used')
            }
        })
})