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
          
            var fields = {};
            $(this).serializeArray().forEach(function(item) {
                fields[item.name] = {'stringValue': item.value};
                console.log(item.name + ' is ' + item.value);
            });
            var file = document.getElementById('mediaCapture').files[0];
            var storageRef = firebase.storage().ref(KEY);
            storageRef.put(file);
            if (document.getElementById('time1').checked === true) {
                fields['10'] = {'booleanValue': true};
            }
            else {
                fields['10'] = {'booleanValue': false};
            }
            if (document.getElementById('time2').checked === true) {
                fields['11'] = {'booleanValue': true};
            }
            else {
                fields['11'] = {'booleanValue': false};
            }
            if (document.getElementById('time3').checked === true) {
                fields['12'] = {'booleanValue': true};
            }
            else {
                fields['12'] = {'booleanValue': false};
            }
            if (document.getElementById('time4').checked === true) {
                fields['13'] = {'booleanValue': true};
            }
            else {
                fields['13'] = {'booleanValue': false};
            }
            if (document.getElementById('time5').checked === true) {
                fields['14'] = {'booleanValue': true};
            }
            else {
                fields['14'] = {'booleanValue': false};
            }
            if (document.getElementById('time6').checked === true) {
                fields['15'] = {'booleanValue': true};
            }
            else {
                fields['15'] = {'booleanValue': false};
            }
            if (document.getElementById('time7').checked === true) {
                fields['16'] = {'booleanValue': true};
            }
            else {
                fields['16'] = {'booleanValue': false};
            }
            if (document.getElementById('time8').checked === true) {
                fields['17'] = {'booleanValue': true};
            }
            else {
                fields['17'] = {'booleanValue': false};
            }
            var data = {'fields': fields};
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
            data['returnSecureToken'] = true;
            console.log(data);
            fn(data);
        });
    };

    FormHandler.prototype.addAppointmentSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
          
            var fields = {};
            fields['pet_name'] = {'stringValue': document.getElementById('PetName').value};
            fields['location'] = {'stringValue': document.getElementById('Location').value};
            fields['date'] = {'stringValue': document.getElementById('AvailableDate').value};
            fields['time'] = {'stringValue': document.getElementById('AvailableTime').value};
            var data = {'fields': fields};
            console.log(data);
            fn(data);
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);