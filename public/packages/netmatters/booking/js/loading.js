
/**
 * ---------------------------------------------------------------
 * SHOW: LOADING
 * ---------------------------------------------------------------
 */
function showPageLoading()
{
    $("body").append(
        '<div id="loading-container"> \
            <div id="loading-spinner"> \
                <div class="f_circleG" id="frotateG_01"></div> \
                <div class="f_circleG" id="frotateG_02"></div> \
                <div class="f_circleG" id="frotateG_03"></div> \
                <div class="f_circleG" id="frotateG_04"></div> \
                <div class="f_circleG" id="frotateG_05"></div> \
                <div class="f_circleG" id="frotateG_06"></div> \
                <div class="f_circleG" id="frotateG_07"></div> \
                <div class="f_circleG" id="frotateG_08"></div> \
            </div> \
        </div>'
    );
}


/**
 * ---------------------------------------------------------------
 * HIDE: LOADING
 * ---------------------------------------------------------------
 */
function hidePageLoading()
{
    $("#loading-container").fadeOut(400, function() {
        $(this).remove();
    });
}