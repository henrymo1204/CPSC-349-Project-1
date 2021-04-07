(function (window) {
    'use strict';
    var App = window.App || {};

    function Account(db) {
        this.db = db;
    }

    Account.prototype.listPlayDates = function (key, fn) {
        this.db.getAppointments(key, fn);
    };

    Account.prototype.getUserInfo = function(key, fn) {
        this.db.getUser(key, fn);
    }

    Account.prototype.setUserInfo = function(key, data) {
        this.db.setUser(key, data);
    }

    Account.prototype.setInfo = function(info) {
        var account_number = document.getElementById("AccountNumber");
        account_number.value = KEY;
        var user_name = document.getElementById('UserName');
        user_name.value = info['user_name'];
        var pet_name = document.getElementById('PetName');
        pet_name.value = info['pet_name'];
        var phone_number = document.getElementById('PhoneNumber');
        phone_number.value = info['phone_number'];
        var meet_up_location = document.getElementById('Location');
        meet_up_location.value = info['location'];
        var available_date = document.getElementById('AvailableDate');
        available_date.value = info['available_date'];
        if(info['10']=== true) {
            var time1 = document.getElementById('time1');
            time1.checked = true;
        }
        if(info['11'] === true) {
            var time2 = document.getElementById('time2');
            time2.checked = true;
        }
        if(info['12'] === true) {
            var time3 = document.getElementById('time3');
            time3.checked = true;
        }
        if(info['13'] === true) {
            var time4 = document.getElementById('time4');
            time4.checked = true;
        }
        if(info['14'] === true) {
            var time5 = document.getElementById('time5');
            time5.checked = true;
        }
        if(info['15'] === true) {
            var time6 = document.getElementById('time6');
            time6.checked = true;
        }
        if(info['16'] === true) {
            var time7 = document.getElementById('time7');
            time7.checked = true;
        }
        if(info['17'] === true) {
            var time8 = document.getElementById('time8');
            time8.checked = true;
        }
    }

    Account.prototype.signUp = function(data) {
        var email = data['email'];
        var password = data['password'];
        this.db.signup(email, password);
    }

    Account.prototype.logIn = function(data) {
        var email = data['email'];
        var password = data['password'];
        this.db.login(email, password);
    }

    Account.prototype.listPictures = function(key, fn) {
        this.db.getAll(key, fn);
    }

    Account.prototype.setAppointmentInfo = function(info) {
        var pet_name = document.getElementById('PetName');
        pet_name.value = info['pet_name'];
        var location = document.getElementById('Location');
        location.value = info['location'];
        var available_date = document.getElementById('AvailableDate');
        available_date.value = info['available_date'];
        var select = document.getElementById('AvailableTime');
        if(info['10'] === true) {
            var time1 = document.createElement('option');
            time1.textContent = '10:00AM';
            time1.value = '10:00AM';
            select.appendChild(time1);
        }
        if(info['11'] === true) {
            var time2 = document.createElement('option');
            time2.textContent = '11:00AM';
            time2.value = '11:00AM';
            select.appendChild(time2);
        }
        if(info['12'] === true) {
             var time3 = document.createElement('option');
            time3.textContent = '12:00AM';
            time3.value = '12:00AM';
            select.appendChild(time3);
        }
        if(info['13'] === true) {
            var time4 = document.createElement('option');
            time4.textContent = '01:00PM';
            time4.value = '01:00PM';
            select.appendChild(time4);
        }
        if(info['14'] === true) {
            var time5 = document.createElement('option');
            time5.textContent = '02:00PM';
            time5.value = '02:00PM';
            select.appendChild(time5);
        }
        if(info['15'] === true) {
            var time6 = document.createElement('option');
            time6.textContent = '03:00PM';
            time6.value = '03:00PM';
            select.appendChild(time6);
        }
        if(info['16'] === true) {
            var time7 = document.createElement('option');
            time7.textContent = '04:00PM';
            time7.value = '04:00PM';
            select.appendChild(time7);
        }
        if(info['17'] === true) {
            var time8 = document.createElement('option');
            time8.textContent = '05:00PM';
            time8.value = '05:00PM';
            select.appendChild(time8);
        }
    }

    Account.prototype.setAppointment = function(key, pictureKey, data) {
        this.db.setAppointment(key, pictureKey, data);
    }

    App.Account = Account;
    window.App = App;

})(window);