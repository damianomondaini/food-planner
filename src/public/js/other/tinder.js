/**
 * jTinder initialization
 */
$(".tinder__inner").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
        alert("👎")
    },
	// like callback
    onLike: function (item) {
	    // set the status text
        alert("👍🏻")
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
})

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.tinder-controls .like, .tinder-controls .dislike').click(function(e){
	e.preventDefault()
	$(".tinder__inner").jTinder($(this).attr('data-tinder'))
})