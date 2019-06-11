/**
 * jTinder initialization
 */
$(".tinder-swipe__inner").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
        item.remove()
    },
	// like callback
    onLike: function (item) {
	    // set the status text
        item.remove()
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
$('.tinder-controls__dislike, .tinder-controls__like').click(function(e){
	e.preventDefault()
	$(".tinder-swipe__inner").jTinder($(this).attr('data-tinder'))
})

$('.tinder-controls__dice').click(function(e){
	e.preventDefault()
	var random = Math.floor(Math.random() * 2)
	if (random === 0) {
		$(".tinder-swipe__inner").jTinder('dislike')
	} else {
		$(".tinder-swipe__inner").jTinder('like')
	}
})