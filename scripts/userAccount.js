(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-pet-owner="form"]';
    var SERVER_URL = 'https://firestore.googleapis.com/v1';
    var App = window.App;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Account = App.Account;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var account = new Account(remoteDS);
    account.getUserInfo(KEY, function(data) {
        account.setInfo(data);
    });
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addAccountSubmitHandler(function(data) {
        account.setUserInfo(KEY, data);
    });
    console.log(formHandler);



})(window);