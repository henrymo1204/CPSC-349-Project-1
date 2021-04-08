(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class RemoteDataStore {

        constructor(url) {
            console.log('running the DataStore function');
            if (!url) { throw new Error('No remote URL supplied.'); }

            this.db = firebase.firestore();
            this.auth = firebase.auth();
            this.storage = firebase.storage();
        }

        signup(email, password) {
            this.auth.createUserWithEmailAndPassword(email, password)
                .then((userCreditial) => {
                    console.log(userCreditial);
                    var id = userCreditial['user']['uid'];
                    this.db.collection('users').doc(id).set({})
                        .then(() => {
                            console.log('Document successfully written!');
                            $('#ex1').html("<p>Sign Up Successfully!</p><a rel='modal:close'><button id=close>Close</button></a>");
                            $("#ex1").modal("show");
                            $('#close').on("click", function() {
                                window.location.href='index.html';
                            });
                        })
                        .catch((error) => {
                            console.log('Error writing document: ', error);
                        });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                });
        }

        login(email, password) { 
            this.auth.signInWithEmailAndPassword(email, password)
                .then((userCreditial) => {
                    console.log(userCreditial);
                    var id = userCreditial['user']['uid'];
                    document.cookie = 'key=' + id;
                    window.location.href = 'userAccount.html';
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    $('#ex1').html("<p>" + errorMessage + "</p><a rel='modal:close'><button id=close>Close</button></a>");
                    $("#ex1").modal("show");
                });
        }

        setUser(key, data) {
            this.db.collection('users').doc(key).set({
                user_name: data['user_name'],
                phone_number: data['phone_number'],
                pet_name: data['pet_name'],
                location: data['location'],
                available_date: data['available_date'],
                '10': data['10'],
                '11': data['11'],
                '12': data['12'],
                '13': data['13'],
                '14': data['14'],
                '15': data['15'],
                '16': data['16'],
                '17': data['17'],
            })
            .then(() => {
                if(data['image'] !== undefined) {
                    this.storage.ref(KEY).put(data['image'])
                        .then(() => {
                            $('#ex1').html("<p>Saved!</p><a rel='modal:close'><button id=close>Close</button></a>");
                            $("#ex1").modal("show");
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.log(errorCode);
                            console.log(errorMessage);
                        });
                }
                else {
                    $('#ex1').html("<p>Saved!</p><a rel='modal:close'><button id=close>Close</button></a>");
                    $("#ex1").modal("show");
                }
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        }

        getUser(key, cb) {
            this.db.collection('users').doc(key).get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log(doc.data());
                        if (Object.keys(doc.data()).length === 0 && doc.data().constructor === Object) {
                            var account_number = document.getElementById("AccountNumber");
                            account_number.value = KEY;
                        }
                        else {
                            this.storage.ref().child(key).getDownloadURL()
                            .then((url) => {
                                // `url` is the download URL for 'images/stars.jpg'
                
                                // This can be downloaded directly:
                                var xhr = new XMLHttpRequest();
                                xhr.responseType = 'blob';
                                // xhr.onload = (event) => {
                                // var blob = xhr.response;
                                // };
                                xhr.open('GET', url);
                
                                cb(doc.data());

                                // Or inserted into an <img> element
                                var img = document.getElementById('blah');
                                img.setAttribute('src', url);
                                img.width = 200;
                            })
                            .catch((error) => {
                                console.log(error);
                                cb(doc.data());
                            });
                        }
                    }
                    else {
                        console.log('No such document!');
                    }
                })
                .catch((error) => {
                    console.log('Eroor getting document: ', error);
                })
        }

        getAll(key, fn) {
            this.db.collection('users').get()
            .then((doc) => {
                var data = [];
                doc.forEach(document => {
                    if (document.id !== key){
                        data[document.id] = document.data();
                    }
                });
                fn(data);
            })
            .catch((error) => {
                console.log('Eroor getting document: ', error);
            });
        }

        setAppointment(key, targetKey, val) {
            this.db.collection('users').doc(key).collection('time').get()
                .then((doc) => {
                    var exist = false;
                    doc.forEach(document => {
                        if (document.data().date === val['date'] && document.data().time === val['time']) {
                            exist = true;
                        }
                    });
                    if (exist === false) {
                        this.db.collection('users').doc(key).get()
                        .then((doc1) => {
                            if (doc1.exists) {
                                this.db.collection('users').doc(targetKey).collection('appointments').add({
                                    user_id: key,
                                    user_name: doc1.data()['user_name'],
                                    phone_number: doc1.data()['phone_number'],
                                    pet_name: val['pet_name'],
                                    location: val['location'],
                                    date: val['date'],
                                    time: val['time']
                                })
                                .then((response) => {
                                    console.log(response.id);
                                    console.log('Document successfully written!');
                                    this.db.collection('users').doc(targetKey).collection('time').add({
                                        date: val['date'],
                                        time: val['time']
                                    });
                                    this.db.collection('users').doc(targetKey).get()
                                        .then((doc2) => {
                                            if (doc2.exists) {
                                                this.db.collection('users').doc(key).collection('appointments').doc(response.id).set({
                                                    user_id: targetKey,
                                                    user_name: doc2.data()['user_name'],
                                                    phone_number: doc2.data()['phone_number'],
                                                    pet_name: val['pet_name'],
                                                    location: val['location'],
                                                    date: val['date'],
                                                    time: val['time']
                                            })
                                            .then(() => {
                                                console.log('Document successfully written!');
                                                this.db.collection('users').doc(key).collection('time').add({
                                                    date: val['date'],
                                                    time: val['time']
                                                });
                                                $('#ex1').html("<p>Appointment Set Up Successfully!</p><a rel='modal:close'><button id=close>Close</button></a>");
                                                $("#ex1").modal("show");
                                                $('#close').on("click", function() {
                                                    document.cookie = 'pictureKey=' + targetKey + ';expires=Tues, 06 April 2021 00:00:00 PST';
                                                    window.close();
                                                });
                                            })
                                            .catch((error) => {
                                                var errorCode = error.code;
                                                var errorMessage = error.message;
                                                console.log(errorCode);
                                                console.log(errorMessage);
                                            });
                                        }
                                        else {
                                            console.log('No such document!');
                                        }
                                    })
                                    .catch((error) => {
                                        var errorCode = error.code;
                                        var errorMessage = error.message;
                                        console.log(errorCode);
                                        console.log(errorMessage);
                                    });
                                })
                                .catch((error) => {
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    console.log(errorCode);
                                    console.log(errorMessage);
                                });
                            }
                            else {
                                console.log('No such document!');
                            }
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.log(errorCode);
                            console.log(errorMessage);
                        });
                    }
                    else {
                        $('#ex1').html("<p>Your pet already got a play date at this time.</p><a rel='modal:close'><button id=close>Close</button></a>");
                        $("#ex1").modal("show");
                    }
                });
        }

        cancelAppointment(key, targetKey, appointmentKey) {
            var url = this.serverURL;
            $.ajax({ type: 'DELETE', url: url + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + key + '/' + 'appointments' + '/' + appointmentKey, contentType: 'application/json',
                success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));

                    $.ajax({ type: 'DELETE', url: url + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + targetKey + '/' + 'appointments' + '/' + appointmentKey, contentType: 'application/json',
                        success: function(response) { 
                            console.log('function returned: ' + JSON.stringify(response));
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        getAppointments(key, cb) {
            this.db.collection('users').doc(key).collection('appointments').get()
                .then((doc) => {
                    var data = [];
                    doc.forEach(document => {
                        data[document.id] = document.data();
                    });
                    cb(data);
                })
                .catch((error) => {
                    console.log('Eroor getting document: ', error);
                });
        }

        getAppointment(key, appointmentKey) {
            $.ajax({ type: 'GET', url: this.serverURL + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + key + '/' + 'appointments' + '/' + appointmentKey, contentType: 'application/json',
                success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);