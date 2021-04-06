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

    List.prototype.pictures = function(pictures) {
        for (let i in pictures) {
            var picture = new Picture(pictures[i]);
            this.$element.append(picture.$element);
        }
    }

    function Picture(key) {
        var storageRef = firebase.storage().ref();
        var $div = $('<div></div>', {
            'data-play-dates': 'img', class: 'img'
        });
        storageRef.child(key).getDownloadURL()
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                var blob = xhr.response;
                };
                xhr.open('GET', url);

                // Or inserted into an <img> element

                var $img = $('<img></img>', {
                    id: key, 
                    src: url,
                    onClick: 'openReservation(this)'
                });

                $div.append($img);

            })
            .catch((error) => {
                console.log(error);
            });
        this.$element = $div;
    }

    App.List = List;
    window.App = App;

})(window);