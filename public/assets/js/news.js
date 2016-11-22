

/**
 *---------------------------------------------------------------
 * WINDOW LOAD FUNCTIONS
 *---------------------------------------------------------------
*/

    $(window).load(function() {
        newsSlider();
    });


/**
 *---------------------------------------------------------------
 * NEWS SLIDESHOW
 *---------------------------------------------------------------
*/

    function newsSlider()
    {
        if ($('.image-slider .slide').length <= 1) {
            return false;
        }

        $('.image-slider').owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            autoHeight: true
        });

    }
