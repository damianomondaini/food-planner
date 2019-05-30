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

    $.ajax({
        type: "POST",
        url: "/me/recipe-add",
        data: formData,
        processData: false,
        contentType: false
    })
    .done((data) => {
        console.log(data)
        recipeIngredientCreate = []
    })
})