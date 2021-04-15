(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var db;

    function List(selector, database) {
        if (!selector) { 
            throw new Error("No selector provided"); 
        }

        this.$element = $(selector);
        db = database;
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    };

    List.prototype.init = function (playDates) {
        for (var key in playDates) {
            var appointment = playDates[key];
            var id = key;
            var rowElement = new Row(appointment, id);
            this.$element.append(rowElement.$element);
        }
    }

    function Row(appointment, id) {
        var $form = $('<div></div>', {
            class: 'row-form'
        });

        var $div = $('<div></div>');

        var $label = $('<label></label>')

        var description = 'Date: ' + appointment.date + '<br></br> Time: ' + appointment.time + '<br></br> Location: ' + appointment.location + '<br></br> User Name: ' 
                                   + appointment.user_name + '<br></br> Pet Name: ' + appointment.pet_name + '<br></br> Phone Number: ' + appointment.phone_number;
                                   
        var $img = $('<img></img>', {
            id: appointment.user_id
        })

        var $button = $('<button>Cancel Appointment</button>')

        $button.click(function(){
            db.cancelAppointment(KEY, appointment.user_id, id, appointment.time_id, appointment.user_time_id);
        });

        var storageRef = firebase.storage().ref();
        storageRef.child(appointment.user_id).getDownloadURL()
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                // xhr.onload = (event) => {
                // var blob = xhr.response;
                // };
                xhr.open('GET', url);

                $img = $('<img></img>', {
                    src: url,
                    class: 'history-img'
                })

                console.log($img);

                var image = document.getElementById(appointment.user_id);
                image.setAttribute('src', url);
                image.width = 500;

            })
            .catch((error) => {
                console.log(error);
            });

        $label.append(description);
        $div.append($label);
        $div.append($img);
        $form.append($div);
        $form.append($button);

        this.$element = $form;
    }

    List.prototype.pictures = function(pictures) {
        new Picture(pictures);
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
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    App.List = List;
    window.App = App;

})(window);