(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) { 
            throw new Error("No selector provided"); 
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addAccountSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
          
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            var file = document.getElementById('mediaCapture').files[0];
            data['image'] = file;
            console.log(file);
            if (document.getElementById('time1').checked === true) {
                data['10'] = true;
            }
            else {
                data['10'] = false;
            }
            if (document.getElementById('time2').checked === true) {
                data['11'] = true;
            }
            else {
                data['11'] = false;
            }
            if (document.getElementById('time3').checked === true) {
                data['12'] = true;
            }
            else {
                data['12'] = false;
            }
            if (document.getElementById('time4').checked === true) {
                data['13'] = true;
            }
            else {
                data['13'] = false;
            }
            if (document.getElementById('time5').checked === true) {
                data['14'] = true;
            }
            else {
                data['14'] = false;
            }
            if (document.getElementById('time6').checked === true) {
                data['15'] = true;
            }
            else {
                data['15'] = false;
            }
            if (document.getElementById('time7').checked === true) {
                data['16'] = true;
            }
            else {
                data['16'] = false;
            }
            if (document.getElementById('time8').checked === true) {
                data['17'] = true;
            }
            else {
                data['17'] = false;
            }
            console.log(data);
            fn(data);
        });
    };


    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');

        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
          
            var data = {};
            data['email'] = document.getElementById('emailAddress').value;
            data['password'] = document.getElementById('password').value;
            fn(data);
        });
    };

    FormHandler.prototype.addAppointmentSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
          
            var data = {};
            data['pet_name'] = document.getElementById('PetName').value;
            data['location'] = document.getElementById('Location').value;
            data['date'] = document.getElementById('AvailableDate').value;
            data['time'] = document.getElementById('AvailableTime').value;
            console.log(data);
            fn(data);
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);