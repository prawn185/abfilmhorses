
/**
 * Declare variables
 */
var date        = new Date();
var d           = date.getDate();
var m           = date.getMonth();
var y           = date.getFullYear();

var startDate   = null;
var endDate     = null;

var calendar    = $('#calendar');
var events      = [];
var categories  = [];
var users       = [];

var pageHeight; // Visable page height
var pageWidth; // Visable page width

/**
 * Handle Date Time Picker
 */
function handleDateTimePicker()
{
    $('.date-time-picker').datetimepicker({
        format          : 'DD/MM/YYYY HH:mm',
        pick12HourFormat: false,
        useSeconds      : false, //en/disables the seconds picker
        language        : 'en'   //sets language locale
    });
}


/**
 *  Handle resizeDiv
 */
function resizeDiv()
{
    pageWidth   = $(window).width();
    pageHeight  = $(window).height() - 190; // visable page height - nav and header

    $('.h-full').css({
        'height' : pageHeight + 'px'
    });
}


/**
 *  Handle Loading
 *  @param bool true/false
 */
function handleLoading(bool)
{
    if (bool) {
        showPageLoading()

    } else {
        hidePageLoading()
    }
}


/**
 * Handle Event Render
 */
function handleEventRender(event, element, view)
{
    if (event.allDay === 'true') {
        event.allDay = true;
    } else {
        event.allDay = false;
    }

    // Add aditional data to the event layout
    element.attr('id', event.id);

    var fcContent = element.find('.fc-content');
    fcContent.append('<div class="fc-details"></div>');

    var fcTitle = fcContent.find('fc-title');
    var fcDetails = fcContent.find('.fc-details');

    // Display Status
    if (event.status.name == 'Complete') {
        element.addClass('complete');
        fcContent.prepend('<i class="m-r-xs glyphicons ok_2 txt-green"></i>');

    } else if (event.status.name == 'Confirmed') {
        fcContent.prepend('<i class="m-r-xs glyphicons thumbs_up txt-blue"></i>');

    } else {
        fcContent.prepend('<i class="m-r-xs glyphicons circle_question_mark txt-orange"></i>');
    }

    // Add the category colours to the event
    if (!$.isEmptyObject(event.categories)) {
        $.each(event.categories, function(key, category) {
            element.css({
                "color"            : category.colour,
                "background-color" : category.background_colour
            });
            element.addClass(category.name.toLowerCase());
        });
    }

    // Add the event details
    if (!$.isEmptyObject(event.contact) && event.contact.salutation != null) {
        fcDetails.append('<div class="fc-contact-name small">' + event.contact.salutation + '</div>');
    }
    if (!$.isEmptyObject(event.address) && event.address.line_1 != null) {
        fcDetails.append('<div class="fc-address small">' + event.address.line_1 + ', ' + event.address.city + ', ' + event.address.postcode + '</div>');
    }
    if (!$.isEmptyObject(event.contact) && event.contact.telephone != null) {
        fcDetails.append('<div class="fc-contact-telephone small">' + event.contact.telephone + '</div>');
    }
    if (!$.isEmptyObject(event.contact) && event.contact.mobile!= null) {
        fcDetails.append('<div class="fc-contact-mobile small">' + event.contact.mobile + '</div>');
    }
}


/**
 *  Handle Event Modal
 *  @param event
 */
function handleEventModal(event)
{
    // Create the Bootstrap Modal
    var BsmView = new BootstrapModal();

    // Is this a new or an existing event
    if (event == null) {
        BsmView.bsm_title.html('Create Booking');
        BsmView.bsm_primary.html('Create Booking');
        BsmView.bsm_body.load(Routes.booking.create, function(e) {
            $.event.trigger("modalLoaded");
        });
        var successMsg  = 'Booking successfully created';
        var errorMsg    = 'Error creating booking';

    } else {
        BsmView.bsm_title.html('View Booking: ' + '<span class="txt-orange">' + event.title + '</span>');
        BsmView.bsm_primary.html('Save Changes');
        BsmView.bsm_body.load(Routes.booking.edit + '/' + event.id, function(e) {
            $.event.trigger("modalLoaded");
        });
        var successMsg  = 'Booking successfully updated';
        var errorMsg    = 'Error updating booking';
    }

    // Allow overflow and Show the footer and the modal
    BsmView.bsm_footer.show();
    BsmView.bsm_body.css({"overflow" : "visible"});
    BsmView.bsm.modal('show');

    // If the user clicks the primary button
    BsmView.bsm_primary.on('click', function(e) {
        e.preventDefault();

        var form = BsmView.bsm_body.children('form');
        var formUrl = form.attr("action");
        var formData = new FormData(form[0]);

        // Prefill form start and end dates if selected
        if (startDate !== null) {
            form.find('#start-date').val(startDate);
        }
        if (endDate !== null) {
            form.find('#end-date').val(endDate);
        }

        // Setup validation
        form.validate({
            ignore : ":not(select:hidden, input:hidden, input:visible, textarea:visible)"
        });

        // If valid submit the form via ajax
        if (form.valid()) {
            $.ajax({
                url         : formUrl,
                type        : 'POST',
                data        : formData,
                contentType : false,
                processData : false,
                success     : function(data) {
                    calendar.fullCalendar('refetchEvents');
                    BsmView.bsm_footer.hide();
                    BsmView.bsm_body.html('<div class="alert alert-success">' + successMsg + '</div>');

                    // Hide the modal
                    setTimeout(function() {
                        BsmView.bsm.modal('hide');
                        $(document).off('change', '#account_id');
                    }, 1000);
                },
                fail        : function(data) {
                    BsmView.bsm_body.html('<div class="alert alert-danger">' + errorMsg + '</div>');
                }
            });

        }
        else {
            return false;
        }

        // Unbind the previous click event
        BsmView.bsm_primary.unbind("click");
    });
}


/**
 * Get Events via ajax
 */
function getEvents(start, end, timezone, callback)
{
    // Reset events to an empty array
    events = [];

    // Get the events via ajax
    $.ajax({
        url  : Routes.booking.list,
        type : "GET",
        data : {
            start_at    : moment(start).format('YYYY-MM-DD HH:MM:SS'),
            end_at      : moment(end).format('YYYY-MM-DD HH:MM:SS'),
            users       : users,
            categories  : categories
        },
        success : function(rows)
        {
            $.each(rows, function(key, row) {
                events.push({
                    // Standard Jquery calander fields
                    id               : row.id,
                    title            : row.name,
                    allDay           : row.all_day,
                    start            : moment(row.start_at).toDate(),
                    end              : moment(row.end_at).toDate(),
                    url              : row.url,
                    className        : row.class_name,
                    colour           : row.colour,
                    backgroundColour : row.background_colour,

                    // Custom fields
                    categories       : row.categories || null,
                    account          : row.account || null,
                    address          : row.address || null,
                    contact          : row.contact || null,
                    user             : row.user || null,
                    quote            : row.quote || null,
                    job              : row.job || null,
                    status           : row.status|| null,
                    description      : row.description
                });
            });
            callback(events);
        }
    });
}


/**
 *  Handle Day View
 */
function handleDayView()
{
    $(document).on('click', '.btn-day', function(e) {
        calendar.fullCalendar('changeView', 'agendaDay');
    });
}


/**
 *  Handle Week View
 */
function handleWeekView()
{
    $(document).on('click', '.btn-week', function(e) {
        calendar.fullCalendar('changeView', 'agendaWeek');
    });
}


/**
 *  Handle Month View
 */
function handleMonthView()
{
    $(document).on('click', '.btn-month', function(e) {
        calendar.fullCalendar('changeView', 'month');
    });
}


/**
 *  Handle Today View
 */
function handleTodayView()
{
    $(document).on('click', '.btn-today', function(e) {
        calendar.fullCalendar('today');
    });
}

/**
 *  Handle Today View
 */
function handlePrintToday()
{
    $(document).on('click', '.btn-print', function(e) {
        active_user = $('#active_user').html();
        if(active_user.length !== 0) {
            window.open(Routes.booking.pdf + active_user);
        }

    });
}


/**
 * Handle Day Click
 */
function handleDayClick(date, allDay, jsEvent, view)
{
    calendar.fullCalendar('select', date);
    calendar.fullCalendar('gotoDate', date);
    //calendar.fullCalendar('changeView', "agendaDay");
}


/**
 * Handle Event Click
 */
function handleEventClick(event, jsEvent, view)
{
    // Internal or External link
    if (event.url == null) {
        handleEventModal(event);
    }
}


/**
 * Handle Create Booking Btn
 */
function handleCreateBtn()
{
    $(document).on('click', '.btn-create', function(e)
    {
        e.preventDefault();

        handleEventModal(null);

        return false;
    });
}


/**
 * Handle user filter
 */
function handleUserFilter()
{
    $(document).on('click', '.user-filter', function(e)
    {
        // Reset users to an empty array
        users = [];

        // Clear the active class
        $('#users li').each(function() {
            $(this).removeClass('active');
        });

        // Add the selected users to the array
        users.push(
            $(this).data('user-id')
        );

        $('#active_user').html($(this).data('user-id'));

        $(this).parent('li').addClass('active');
        $('.selected-user').text($(this).text());

        // Refetch the calender events via ajax passing through the selected users
        calendar.fullCalendar('refetchEvents');
    });
}


/**
 * Handle category filter
 */
function handleCategoryFilter()
{
    $(document).on('click', '.category-filter', function(e)
    {
        // Reset categories to an empty array
        categories = [];

        // Clear the active filter
        $('#categories li').each(function() {
            $(this).removeClass('active');
        });

        // Add the selected categories to the array
        categories.push(
            $(this).data('category-id')
        );
        $(this).parent('li').addClass('active');

        // Refetch the calender events via ajax passing through the selected categories
        calendar.fullCalendar('refetchEvents');
    });
}


/**
 * Handle Event Delete
 */
function handleEventDelete(event)
{
    var decision = confirm("Are you sure you wish to remove this event?");
    if (decision) {
        $.ajax({
            url  : Routes.booking.delete,
            data : {
                id     : event.id,
                _token : Routes.csrfToken
            },
            type : "POST"
        });
        calendar.fullCalendar('removeEvents', event.id);
    }
}


/**
 * Handle Event Drop
 */
function handleEventDrop(event, delta)
{
    var start   = moment(event.start).format('DD/MM/YYYY HH:MM');
    var end     = moment(event.end).format('DD/MM/YYYY HH:MM');

    $.ajax({
        url     : Routes.booking.update,
        data    : {
            id       : event.id,
            name     : event.title,
            start_at : start,
            end_at   : end,
            _token   : Routes.csrfToken
        },
        type    : "POST",
        success : function(json) {
            App.bootstrap.notifyUser('Event details updated', 'success');
        }
    });
}


/**
 * Handle Event Resize
 */
function handleEventResize(event)
{
    var start   = moment(event.start).format('DD/MM/YYYY HH:MM');
    var end     = moment(event.end).format('DD/MM/YYYY HH:MM');

    $.ajax({
        url     : Routes.booking.update,
        data    : {
            id       : event.id,
            name     : event.title,
            start_at : start,
            end_at   : end,
            _token   : Routes.csrfToken
        },
        type    : "POST",
        success : function(json) {
            App.bootstrap.notifyUser('Event details updated', 'success');
        }
    });
}


/**
 * Handle Select
 */
function handleSelect(start, end, allDay)
{
    startDate = moment(start).format('DD/MM/YYYY HH:MM');
    endDate   = moment(end.start).format('DD/MM/YYYY HH:MM');

    //calendar.fullCalendar('unselect');
}


/**
 * Handle Event Mouse Over
 */
function handleEventMouseOver(event, jsEvent, view)
{
    console.log(event);

    // Get the overlay
    var overlay = $('.fc-overlay');
    overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');

    // Set the overlay data
    overlay.find('.overlay-title').html(event.title);
    overlay.find('.overlay-start').html(event.start);
    overlay.find('.overlay-end').html(event.end);
    overlay.find('.overlay-info').html(event.info);

    // Wrap the overlay around the current event
    var wrap    = $(jsEvent.target).closest('.fc-event');
    var cal     = wrap.closest('#calendar');
    var left    = wrap.offset().left - cal.offset().left;
    var right   = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());

    // Sort out the possition
    if (right > overlay.width()) {
        overlay.addClass('left').find('.arrow').addClass('left pull-up')
    }
    else {
        if (left > overlay.width()) {
            overlay.addClass('right').find('.arrow').addClass('right pull-up');
        }
        else {
            overlay.find('.arrow').addClass('top');
        }
    }
    (wrap.find('.fc-overlay').length == 0) && wrap.append(overlay);
}


/**
 * Get Contacts
 */
function getContacts()
{
    App.ajax.selectList($("#contact_id").data('url'), '#contact_id', {
        account_id  : $("#account_id").val()
    });
}


/**
 * Get Addresses
 */
function getAddresses()
{
    App.ajax.selectList($("#address_id").data('url'), '#address_id', {
        account_id  : $("#account_id").val()
    });
}


/**
 * Handle Accounts
 */
function handleAccounts()
{
    $(document).on('change', '#account_id', function(e) {
        if ($('#account_id').val() != '' && $('#account_id').val() != 0) {
            getContacts();
            getAddresses();
            $('#contact-block').hide();
            $('#address-block').hide();
        }
    });
}


/**
 * Setup the jquery calender
 */
function setupCalender()
{
    calendar.fullCalendar({
        height        : pageHeight,
        editable      : true,
        selectable    : true,
        selectHelper  : true,
        allDaySlot    : true,
        allDayText    : 'All Day',
        weekNumbers   : false,
        timeFormat    : 'H:mm',
        minTime       : '06:00:00',
        maxTime       : '19:00:00',
        slotDuration  : '00:30:00',
        firstDay      : 1, // 1 = Monday
        businessHours : {
            start : '6:00',
            end   : '19:00',
            dow   : [1, 2, 3, 4, 5]
        },
        header : {
            left   : 'prev',
            center : 'title',
            right  : 'next'
        },
        eventLimit     : true,
        events         : getEvents,
        loading        : handleLoading,
        dayClick       : handleDayClick,
        eventClick     : handleEventClick,
        eventDrop      : handleEventDrop,
        eventResize    : handleEventResize,
        //eventMouseover : handleEventMouseOver,
        eventRender    : handleEventRender,
        select         : handleSelect
    });
}


/**
 * Document ready functions
 */
jQuery(document).ready(function()
{
    resizeDiv();
    setupCalender();
    handleTodayView();
    handleDayView();
    handleWeekView();
    handleMonthView();
    handleCreateBtn();
    handleUserFilter();
    handleCategoryFilter();
    handlePrintToday();
}
);


/**
 * Window load functions
 */
$(window).load(function()
{

});


/**
 * Window resize functions
 */
$(window).resize(function()
{
    resizeDiv();
});


/**
 * Modal form loaded functions
 */
$(document).on('modalLoaded', function()
{
    handleDateTimePicker();
    handleAccounts();
});