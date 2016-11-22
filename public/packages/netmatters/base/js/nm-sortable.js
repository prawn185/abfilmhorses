/*
 * HTML5 Sortable jQuery Plugin
 * http://farhadi.ir/projects/html5sortable
 *
 * Copyright 2012, Ali Farhadi
 * Released under the MIT license.
 */
(function($)
{
    var dragging, placeholders = $();
    $.fn.sortable = function(options)
    {
        var method = String(options);
        options = $.extend({
            connectWith : false,
            duplicateElement: false,
            placeHolderClass: 'sortable-place-holder',
            onDragEnd: function() {}
        }, options);


        return this.each(function()
        {

            if (/^enable|disable|destroy$/.test(method)) {
                var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
                if (method == 'destroy') {
                    items.add(this).removeData('connectWith items')
                        .off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
                }
                return;
            }

            var isHandle, index, items = $(this).children(options.items);

            // Get Class List
            var classList = $(isHandle).attr('class');

            var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="' + options.placeHolderClass + '">');
            items.find(options.handle).mousedown(function()
            {
                isHandle = true;
            }).mouseup(function()
            {
                isHandle = false;
            });
            $(this).data('items', options.items)
            placeholders = placeholders.add(placeholder);
            if (options.connectWith) {
                $(options.connectWith).add(this).data('connectWith', options.connectWith);
            }
            items.attr('draggable', 'true').on('dragstart.h5s', function(e)
            {

                // Duplicate if option set
                if(options.duplicateElement) {

                }

                if (options.handle && !isHandle) {
                    return false;
                }
                isHandle = false;
                var dt = e.originalEvent.dataTransfer;
                dt.effectAllowed = 'move';
                dt.setData('Text', 'dummy');
                index = (dragging = $(this)).addClass('sortable-drag').index();
                start_parent = $(this).parent();

            }).on('dragend.h5s', function()
            {
                if (!dragging) {
                    return;
                }
                dragging.removeClass('sortable-drag').show();
                placeholders.remove();
                attr = false;
                new_parent = $(this).parent();
                if (index != dragging.index() || start_parent != new_parent) {
                    dragging.parent().trigger('sortupdate', {item : dragging});
                }
                dragging = null;
            }).not('a[href], img').on('selectstart.h5s', function()
            {

                this.dragDrop && this.dragDrop();
                return false;
            }).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function(e)
            {

                if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
                    return true;
                }
                if (e.type == 'drop') {
                    e.stopPropagation();
                    placeholders.filter(':visible').after(dragging);
                    placeholders.removeAttr('class').addClass('sortable-place-holder');
                    dragging.trigger('dragend.h5s');

                    options.onDragEnd();

                    return false;
                }
                e.preventDefault();
                e.originalEvent.dataTransfer.dropEffect = 'move';
                if (items.is(this)) {

                    if (options.forcePlaceholderSize) {

                        className = dragging.attr('class');
                        placeholder.addClass(className);
                        placeholder.height(dragging.children().outerHeight());

                    }

                    dragging.hide();

                    // Insert based on position over current target (top half = before, bottom half = after)
                    var y = e.originalEvent.pageY - $(this).offset().top;
                    var bottomHalf = y > $(this).height() * 0.5;
                    $(this)[bottomHalf ? 'after' : 'before'](placeholder);

                    placeholders.not(placeholder).remove();
                } else {
                    if (!placeholders.is(this) && !$(this).children(options.items).length) {
                        placeholders.remove();
                        $(this).append(placeholder);

                    }

                }
                return false;
            });
        });
    };
})(jQuery);
