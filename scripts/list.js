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
        for (var key in playDates) {
            var time = playDates[key]['time'];
            var id = key;
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

        var description = 'Play date # ' + id + ' Time: ' + time;

        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    List.prototype.pictures = function(pictures) {
        console.log(pictures);
        for (var key in pictures) {
            var picture = new Picture(key);
        }
    }

    function Picture(key) {
        var storageRef = firebase.storage().ref();
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

                images.push({key: key, url: url});
                console.log(images);

                document.getElementById('center_image').setAttribute('src', images[counter].url);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    App.List = List;
    window.App = App;

})(window);