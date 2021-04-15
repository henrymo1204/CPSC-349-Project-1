(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    // Initialize Firebase
    firebase.initializeApp(App.firebaseConfig);
    firebase.analytics();

    class RemoteDataStore {

        constructor() {
            console.log('running the DataStore function');

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
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                console.log(errorCode);
                                console.log(errorMessage);
                                cb(doc.data());
                            });
                        }
                    }
                    else {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);
                    }
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                })
        }

        // getAll(key, fn) {
        //     this.db.collection('users').get()
        //     .then((doc) => {
        //         var data = [];
        //         doc.forEach(document => {
        //             if (document.id !== key){
        //                 data[document.id] = document.data();
        //             }
        //         });
        //         fn(data);
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         console.log(errorCode);
        //         console.log(errorMessage);
        //     });
        // }

        getAllPictures(key, fn) {
            this.storage.ref().listAll()
                .then((res) => {
                    var data = [];
                    res.items.forEach((itemRef) => {
                        if (itemRef.name !== key) {
                            fn(itemRef.name);
                        }
                    });
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
                                this.db.collection('users').doc(targetKey).collection('time').add({
                                    date: val['date'],
                                    time: val['time']
                                })
                                .then((response1) => {
                                    this.db.collection('users').doc(key).collection('time').add({
                                        date: val['date'],
                                        time: val['time']
                                    })
                                    .then((response2) => {
                                        console.log(response1.id);
                                        console.log(response2.id);
                                        console.log('Document successfully written!');
                                        this.db.collection('users').doc(targetKey).collection('appointments').add({
                                            user_id: key,
                                            user_time_id: response2.id,
                                            time_id: response1.id,
                                            user_name: doc1.data()['user_name'],
                                            phone_number: doc1.data()['phone_number'],
                                            pet_name: doc1.data()['pet_name'],
                                            location: val['location'],
                                            date: val['date'],
                                            time: val['time']
                                        })
                                        .then((response3) => {
                                            console.log(response3.id)
                                            this.db.collection('users').doc(targetKey).get()
                                                .then((doc2) => {
                                                    if (doc2.exists) {
                                                        this.db.collection('users').doc(key).collection('appointments').doc(response3.id).set({
                                                            user_id: targetKey,
                                                            user_time_id: response1.id,
                                                            time_id: response2.id,
                                                            user_name: doc2.data()['user_name'],
                                                            phone_number: doc2.data()['phone_number'],
                                                            pet_name: doc2.data()['pet_name'],
                                                            location: val['location'],
                                                            date: val['date'],
                                                            time: val['time']
                                                        })
                                                        .then(() => {
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
                                                        var errorCode = error.code;
                                                        var errorMessage = error.message;
                                                        console.log(errorCode);
                                                        console.log(errorMessage);
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

        cancelAppointment(key, targetKey, appointmentKey, key_time, targetKey_time) {
            console.log(key);
            console.log(targetKey);
            console.log(appointmentKey);
            this.db.collection('users').doc(key).collection('appointments').doc(appointmentKey).delete()
                .then(() => {
                    this.db.collection('users').doc(targetKey).collection('appointments').doc(appointmentKey).delete()
                        .then(() => {
                            this.db.collection('users').doc(key).collection('time').doc(key_time).delete()
                                .then(() => {
                                    this.db.collection('users').doc(targetKey).collection('time').doc(targetKey_time).delete()
                                        .then(() => {
                                            console.log('Appointment ' + appointmentKey + ' canceled.');
                                            $('#ex1').html("<p>Appointment canceled!</p><a rel='modal:close'><button id=close>Close</button></a>");
                                            $("#ex1").modal("show");
                                            $('#close').on("click", function() {
                                                window.location.reload();
                                            });
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
                })
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
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                });
        }

        // getAppointment(key, appointmentKey) {
        //     $.ajax({ type: 'GET', url: this.serverURL + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + key + '/' + 'appointments' + '/' + appointmentKey, contentType: 'application/json',
        //         success: function(response) { 
        //             console.log('function returned: ' + JSON.stringify(response));
        //         },
        //         error: function(error) {
        //             var errorCode = error.code;
        //             var errorMessage = error.message;
        //             console.log(errorCode);
        //             console.log(errorMessage);
        //         }
        //     });
        // }
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);