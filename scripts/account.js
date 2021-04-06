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

    App.Account = Account;
    window.App = App;

})(window);