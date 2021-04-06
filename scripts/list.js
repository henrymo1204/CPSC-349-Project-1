(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function List(selector) {
        if (!selector) { 
            throw new Error("No selector provided"); 
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    };

    List.prototype.init = function (playDates) {
        for (let i in playDates) {
            var time = playDates[i]['fields']['time']['timestampValue'];
            var id = playDates[i]['name'];
            var rowElement = new Row(time, id);
            this.$element.append(rowElement.$element);
        }
    }

    function Row(time, id) {
        var $div = $('<div></div>', {
            'data-play-dates': 'checkbox', class: 'checkbox'
        });

        var $label = $('<label></label>', {
            value: id
        })

        var lastIndex = id.lastIndexOf('/');

        var description = 'Play date # ' + id.substring(lastIndex + 1) + ' Time: ' + time;

        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    App.List = List;
    window.App = App;

})(window);