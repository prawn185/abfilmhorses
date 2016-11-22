// Shared Variables
var width       = getWidth();
var stuck       = null;
var menuActive  = false;
var snapper;

// Pre saved HTML
var mainMenuHtml    = $('#main-menu').html();
var rightColHtml    = $('#right-col').html();


// Document Ready functions
$(document).ready(function() {

    resizeFunctions();
    homeSlider();
    changeSlider();
    owlDemo();
    internalSlideshow();

});


// On Resize check and function call
$(window).resize(function()
{

    if (width === getWidth()) {
        return;
    }

    resizeFunctions();

});


// Resize functions
function resizeFunctions()
{
	loadSlider();
    loadMenu();
    stickyMenu();
}


function owlDemo()
{

    if (!$("#owl-demo").length) {
        return false;
    }

    setTimeout(function() {
        homepageSlider();
    }, 600);

    function homepageSlider()
    {
        var slider = $('#owl-demo').owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            slideSpeed      : 300,
            paginationSpeed : 400,
            items           : 1,
            loop            : true,
            autoplay        : true,
            onInitialized   : function()
            {
                $("#homepagebanner .load").removeClass('loading');
                $('#owl-demo').show();
            }
        });

    }
}

function internalSlideshow()
{
    if (!$("#owl-internal").length) {
        return false;
    }

    setTimeout(function() {
        internalSlider();
    }, 600);

    function internalSlider()
    {
        $("#owl-internal").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            slideSpeed      : 300,
            paginationSpeed : 400,
            items           : 1,
            autoplay        : true,
            onInitialized   : function()
            {
                $("#internalbanner .load").removeClass('loading');
                $('#owl-internal').show();
            }

        });
    }

}

// Sticky Menu
// base on width of window
function stickyMenu()
{

    if (!$('#right-col').length) {
        return false;
    }

    if (stuck !== null) {
        $('#right-col-container').html('<div id="right-col">' + rightColHtml + '</div>');
    }

    if (getWidth() >= 975 && $('#right-col').height() < ($(window).height() - ($('footer#footer').outerHeight() + $('footer#base').outerHeight() + 30))) {

        $('#right-col').width($('#right-col').width());
        stuck = $("#right-col").sticky({
            topSpacing: 30
        });
    }

}


// Load Menu
// base on width of window
function loadMenu()
{
    if (getWidth() >= 1244) {
        removeSlideoutMenu();
    } else {
        slideoutMenu();
    }
}


// Add Slideout Menu
function slideoutMenu()
{

    if (menuActive === false) {

        //$('#main-menu ul').remove();

        $('body').append('<div class="snap-drawers"><div class="snap-drawer snap-drawer-right" id="menu-right"></div></div>');

        $('#menu-right').html(mainMenuHtml);

        snapper = new Snap({
            element: document.getElementById('container'),
            hyperextensible: false,
            disable: 'left'
        });

        icons = ['glyphicon glyphicon-home', 'glyphicon glyphicon-bookmark', 'glyphicons folder_open', 'glyphicon glyphicon-th-large', 'glyphicon glyphicon-bullhorn', 'glyphicon glyphicon-envelope'];

        $('#menu-right > ul > li > a').each(function(key, value) {

            $(this).prepend('<i class="' + icons[key] + '"></i>');

        });

        $('#top-menu button').click(function(){
            if (!$('body').hasClass('snapjs-right')) {
                snapper.open('right');
            }
        });

        $('#menu-right > ul > li > a').click(function(event) {

            subMenu = $(this).parent().find('.dropdown-menu');

            if (subMenu.length && !subMenu.parent().hasClass('open')) {

                subMenu.slideDown();
                event.preventDefault();
                subMenu.parent().addClass('open');
                return false;
            }

        });

        menuActive = true;

    }

}

// Remove Slideout Menu
function removeSlideoutMenu()
{

    if (menuActive === true) {

        // Remove unwanted styles
        $('body').removeClass('snapjs-right');
        $('#container').removeAttr('style');
        $('.snap-drawers').remove();
        $('#main-menu').html(mainMenuHtml);

        snapper.disable();
        menuActive = false;

    }

}

// Load Slideshow
// based on width of window
function loadSlider()
{

	if (!$('.slide').length) {
		return false;
	}

	width = getWidth();

    addSlideshow();

}


// Add slideshow
function addSlideshow()
{
	var slider = $('#feed-container .slide').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items: 4
            }
        }
    });

    $('#feed-container .slide').show();

    $('#feed-container .next').click(function(){
        slider.trigger('next.owl.carousel');
        return false;
    });

    $('#feed-container .prev').click(function(){
        slider.trigger('prev.owl.carousel');
        return false;
    });

}

function changeSlider()
{

    $(document).on('click', '#feed-header .nav li a', function() {

        var url = $(this).data('url');
        $('#feed-container .container').load(url, function() {
            addSlideshow();
        });

    });

}

// Homepage Slider
function homeSlider()
{

    if (!$('#banner .slide').length) {
        return false;
    }

    var sliderSettings = {
//        minSlides: slides,
//        maxSlides: slides,
        controls: false,
//        slideWidth: ,
        slideMargin: 30,
        pager: false,
        touchEnabled: true
    }

    var homeSlider = $('#banner .slide').bxSlider(sliderSettings);

    $('#banner .next').click(function(){
        homeSlider.goToNextSlide();
        return false;
    });

    $('#banner .prev').click(function(){
        homeSlider.goToPrevSlide();
        return false;
    });
}


// Get current with of page
function getWidth()
{
    return $(window).width();
}
