var recipeNameCreate
var recipeCategoryCreate
var recipeCheatMealCreate
var recipeServingCreate
var recipeImageCreate
var recipeIngredientCounterCreate = 1
var recipeIngredientCreate = []

$('#recipeAddIngredientCreate').on('click', () => {
    recipeIngredientCounterCreate++
    var ingredient = $('#recipeIngredientModelCreate').clone()
    ingredient.removeAttr('id')
    ingredient.find('input').val('')
    ingredient.find('#recipeIngredient1Create').attr('id', 'recipeIngredient' + recipeIngredientCounterCreate + 'Create')
    ingredient.find('#recipeAmount1Create').attr('id', 'recipeAmount' + recipeIngredientCounterCreate + 'Create')
    ingredient.find('#recipeUnit1Create').attr('id', 'recipeUnit' + recipeIngredientCounterCreate + 'Create')
    ingredient.appendTo('#recipeIngredientBoxCreate')
})

$('.recipeCreate').on('click', () => {
    recipeNameCreate = $('#recipeNameCreate').val()
    recipeCategoryCreate = $('#recipeCategoryCreate').val()
    if ($('#recipeCheatMealCreate').is(':checked')) {
        recipeCheatMealCreate = true
    } else {
        recipeCheatMealCreate = false
    }
    recipeServingCreate = $('#recipeServingCreate').val()
    for (let i = 1; i < recipeIngredientCounterCreate + 1; i++) {
        var ingredientNameCreate = $('#recipeIngredient' + i + 'Create').val()
        var ingredientAmountCreate = $('#recipeAmount' + i + 'Create').val()
        var ingredientUnitCreate = $('#recipeUnit' + i + 'Create').val()
        var ingredientObjectCreate = {
            "name": ingredientNameCreate,
            "amount": ingredientAmountCreate,
            "unit": ingredientUnitCreate
        }
        recipeIngredientCreate.push(ingredientObjectCreate)
    }

    recipeImageCreate = $('#recipeImageCreate')[0].files[0]

    var formData = new FormData()
    formData.append('name', recipeNameCreate)
    formData.append('category', recipeCategoryCreate)
    formData.append('isCheatMeal', recipeCheatMealCreate)
    formData.append('serving', recipeServingCreate)
    formData.append('ingredients', JSON.stringify(recipeIngredientCreate))
    formData.append('image', recipeImageCreate)

    $('#recipeIngredientModelCreate').nextAll().remove()
    $('#recipeIngredientModelCreate > input').val('')
    $('#recipeIngredientModelCreate > select > option').first().attr('selected', 'selected')
    $('#recipeNameCreate').val('')
    $('#recipeCategoryCreate > option').first().attr('selected', 'selected')
    $('#recipeCheatMealCreate').prop('checked', false)
    $('#recipeServingCreate').val('')
    $('#recipeImageCreate').val('')
    recipeIngredientCreate = []

    $.ajax({
        type: "POST",
        url: "/me/recipe-add",
        data: formData,
        processData: false,
        contentType: false
    })
    .done((data) => {
        var recipeAdded = $('.recipes__model').first().clone()
        recipeAdded.css('display', 'block')
        recipeAdded.attr('data-recipe', JSON.stringify(data))
        recipeAdded.find('.recipes__card-img').css('background-image', 'url("https://drive.google.com/uc?export=view&id=' + data.imageId + '")')
        recipeAdded.find('.recipes__card-title').text(data.name)
        recipeAdded.find('.recipes__card-category').text(data.category.name)
        recipeAdded.appendTo($('.recipes__list'))
    })
})

$('.createModalClose').on('click', () => {
    $('#recipeIngredientModelCreate').nextAll().remove()
    $('#recipeIngredientModelCreate > input').val('')
    $('#recipeIngredientModelCreate > select > option').first().attr('selected', 'selected')
    $('#recipeNameCreate').val('')
    $('#recipeCategoryCreate > option').first().attr('selected', 'selected')
    $('#recipeCheatMealCreate').prop('checked', false)
    $('#recipeServingCreate').val('')
    $('#recipeImageCreate').val('')
    recipeIngredientCreate = []
})