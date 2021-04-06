(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class RemoteDataStore {

        constructor(url) {
            console.log('running the DataStore function');
            if (!url) { throw new Error('No remote URL supplied.'); }

            this.serverURL = url;
        }

        signup(email, password) {
            var val = {'email': email, 'password': password, 'returnSecureToken': true};
            $.ajax({ type: 'POST', url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB7gYphY-KI0365iPlSfniI0U6uyb8lUcg', contentType: 'application/json',
                data: JSON.stringify(val), success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        login(email, password) { 
            var val = {'email': email, 'password': password, 'returnSecureToken': true};
            $.ajax({ type: 'POST', url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB7gYphY-KI0365iPlSfniI0U6uyb8lUcg', contentType: 'application/json',
                data: JSON.stringify(val), success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        setUser(key, name, url) {
            var val = {'fields': {'name': {'stringValue': name}, 'image': {'stringValue': url}}};
            $.ajax({ type: 'POST', url: this.serverURL + '/projects/project1-d755b/databases/(default)/documents/users?documentId=' + key, contentType: 'application/json',
                data: JSON.stringify(val), success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        getUser(key) {
            $.ajax({ type: 'GET', url: this.serverURL + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + key, contentType: 'application/json',
                success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        getAll() {
            $.ajax({ type: 'GET', url: this.serverURL + '/projects/project1-d755b/databases/(default)/documents/users', contentType: 'application/json',
                success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        setAppointment(key, targetKey, time) {
            var val = {"fields": {"time": {"timestampValue": time}}};
            var url = this.serverURL;
            $.ajax({ type: 'POST', url: url + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + key + '/' + 'appointments', contentType: 'application/json',
                data: JSON.stringify(val), success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                    var name = response["name"];
                    var lastIndex = name.lastIndexOf('/');
                    var id = name.substring(lastIndex + 1);
                    console.log(this.serverURL + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + targetKey + '/' + 'appointments?documentId=' + id);

                    $.ajax({ type: 'POST', url: url + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + targetKey + '/' + 'appointments?documentId=' + id, contentType: 'application/json',
                        data: JSON.stringify(val), success: function(response) { 
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
            $.ajax({ type: 'GET', url: this.serverURL + '/projects/project1-d755b/databases/(default)/documents/users' + '/' + key + '/' + 'appointments', contentType: 'application/json',
                success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                    if (cb !== undefined) { 
                        cb(response['documents']); 
                    }
                },
                error: function(error) {
                    console.log(error);
                }
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