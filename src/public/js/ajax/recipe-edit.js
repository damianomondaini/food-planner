var recipeNameCreate
var recipeCategoryCreate
var recipeCheatMealCreate
var recipeServingCreate
var recipeImageCreate
var recipeIngredientCounterCreate = 1
var recipeIngredientCreate = []
var recipeRow

function updateContent(e) {
    recipeRow = $(e).closest('.recipes__item')
    recipeData = JSON.parse(recipeRow.attr('data-recipe'))
    $('#recipeNameTitleUpdate').text(recipeData.name)
    $('#recipeNameUpdate').val(recipeData.name)
    $('#recipeCategoryUpdate > option[value=' + recipeData.category._id + ']').prop('selected', true)
    if (recipeData.isCheatMeal === true) {
        $('#recipeCheatMealUpdate').prop('checked', true)
    } else {
        $('#recipeCheatMealUpdate').prop('checked', false)
    }
    $('#recipeServingUpdate').val(recipeData.serving)
}

$('#recipeDeleteUpdate').on('click', () => {
    formData = 'imageId=' + recipeData.imageId

    $.ajax({
        type: "POST",
        url: "/me/" + recipeData._id + "/recipe-remove",
        data: formData
    })
    .done((data) => {
        if (data === true) {
            $(".recipes__item[data-recipe='" + JSON.stringify(recipeData) + "']").remove()
        }
    })
})