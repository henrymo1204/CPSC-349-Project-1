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
        console.log(key);
        this.db.getUser(key, fn);
    }

    Account.prototype.setUserInfo = function(key, data) {
        this.db.setUser(key, data);
    }

    Account.prototype.setInfo = function(info) {
        var account_number = document.getElementById("AccountNumber");
        var number = info['name'];
        var index = number.lastIndexOf('/');
        account_number.value = number.substring(index + 1);
        var storageRef = firebase.storage().ref();
        storageRef.child(account_number.value).getDownloadURL()
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
                var img = document.getElementById('blah');
                img.setAttribute('src', url);
                img.width = 200;
            })
            .catch((error) => {
                console.log(error);
            });
        if ('fields' in info) {
            if('user_name' in info['fields']) {
                var user_name = document.getElementById('UserName');
                user_name.value = info['fields']['user_name']['stringValue'];
            }
            if('pet_name' in info['fields']) {
                var pet_name = document.getElementById('PetName');
                pet_name.value = info['fields']['pet_name']['stringValue'];
            }
            if('phone_number' in info['fields']) {
                var phone_number = document.getElementById('PhoneNumber');
                phone_number.value = info['fields']['phone_number']['stringValue'];
            }
            if('location' in info['fields']) {
                var meet_up_location = document.getElementById('Location');
                meet_up_location.value = info['fields']['location']['stringValue'];
            }
            if('available_date' in info['fields']) {
                var available_date = document.getElementById('AvailableDate');
                available_date.value = info['fields']['available_date']['stringValue'];
            }
            if(info['fields']['10']['booleanValue'] === true) {
                var time1 = document.getElementById('time1');
                time1.checked = true;
            }
            if(info['fields']['11']['booleanValue'] === true) {
                var time2 = document.getElementById('time2');
                time2.checked = true;
            }
            if(info['fields']['12']['booleanValue'] === true) {
                var time3 = document.getElementById('time3');
                time3.checked = true;
            }
            if(info['fields']['13']['booleanValue'] === true) {
                var time4 = document.getElementById('time4');
                time4.checked = true;
            }
            if(info['fields']['14']['booleanValue'] === true) {
                var time5 = document.getElementById('time5');
                time5.checked = true;
            }
            if(info['fields']['15']['booleanValue'] === true) {
                var time6 = document.getElementById('time6');
                time6.checked = true;
            }
            if(info['fields']['16']['booleanValue'] === true) {
                var time7 = document.getElementById('time7');
                time7.checked = true;
            }
            if(info['fields']['17']['booleanValue'] === true) {
                var time8 = document.getElementById('time8');
                time8.checked = true;
            }
        }
    }

    Account.prototype.signUp = function(data) {
        this.db.signup(data);
    }

    Account.prototype.logIn = function(data) {
        this.db.login(data);
    }

    Account.prototype.listPictures = function(key, fn) {
        this.db.getAll(key, fn);
    }

    Account.prototype.setAppointmentInfo = function(info) {
        if('pet_name' in info['fields']) {
            var pet_name = document.getElementById('PetName');
            pet_name.value = info['fields']['pet_name']['stringValue'];
        }
        if('location' in info['fields']) {
            var location = document.getElementById('Location');
            location.value = info['fields']['location']['stringValue'];
        }
        if('available_date' in info['fields']) {
            var available_date = document.getElementById('AvailableDate');
            available_date.value = info['fields']['available_date']['stringValue'];
        }
        var select = document.getElementById('AvailableTime');
        if(info['fields']['10']['booleanValue'] === true) {
            var time1 = document.createElement('option');
            time1.textContent = '10:00AM';
            time1.value = '10:00AM';
            select.appendChild(time1);
        }
        if(info['fields']['11']['booleanValue'] === true) {
            var time2 = document.createElement('option');
            time2.textContent = '11:00AM';
            time2.value = '11:00AM';
            select.appendChild(time2);
        }
        if(info['fields']['12']['booleanValue'] === true) {
             var time3 = document.createElement('option');
            time3.textContent = '12:00AM';
            time3.value = '12:00AM';
            select.appendChild(time3);
        }
        if(info['fields']['13']['booleanValue'] === true) {
            var time4 = document.createElement('option');
            time4.textContent = '01:00PM';
            time4.value = '01:00PM';
            select.appendChild(time4);
        }
        if(info['fields']['14']['booleanValue'] === true) {
            var time5 = document.createElement('option');
            time5.textContent = '02:00PM';
            time5.value = '02:00PM';
            select.appendChild(time5);
        }
        if(info['fields']['15']['booleanValue'] === true) {
            var time6 = document.createElement('option');
            time6.textContent = '03:00PM';
            time6.value = '03:00PM';
            select.appendChild(time6);
        }
        if(info['fields']['16']['booleanValue'] === true) {
            var time7 = document.createElement('option');
            time7.textContent = '04:00PM';
            time7.value = '04:00PM';
            select.appendChild(time7);
        }
        if(info['fields']['17']['booleanValue'] === true) {
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