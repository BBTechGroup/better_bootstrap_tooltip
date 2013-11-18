/**
 * Created by frank on 11/16/13.
 */
(function($) {
    var mouseEnterTimer;
    var mouseLeaveTimer;
    var isFirstHover = true;

    function betterTooltip(option) {
        var _trigger;
        var _show;
        option = option || {};

        _trigger = option.trigger || 'hover';
        _show = option.delay.show || 0;
        if (_trigger === 'hover') {
            option.trigger = 'manual';
            option.delay.show = 0;
            return this.tooltip(option)
                .mouseenter(function(e) {
                    var that = this;
                    window.clearTimeout(mouseLeaveTimer);
                    if (!isFirstHover) {
                        $(this).tooltip('show');
                    } else {
                        mouseEnterTimer = window.setTimeout(function() {
                            if (mouseEnterTimer) {
                                isFirstHover = false;
                                $(that).tooltip('show');
                            }
                        }, _show);
                    }
                }).mouseleave(function(e) {
                    $(this).tooltip('hide');
                    window.clearTimeout(mouseEnterTimer);
                    mouseLeaveTimer = window.setTimeout(function() {
                        if (mouseLeaveTimer) {
                            isFirstHover = true;
                        }
                    }, _show);
                });
        } else {
            return this.tooltip(option);
        }
    }

    $.fn.betterTooltip = betterTooltip;
})(jQuery);

