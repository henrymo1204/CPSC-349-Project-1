(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-pet-appointment="form"]';
    var App = window.App;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Account = App.Account;
    var remoteDS = new RemoteDataStore();
    var account = new Account(remoteDS);
    account.getUserInfo(PICTURE_KEY, function(data) {
        account.setAppointmentInfo(data);
    });
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addAppointmentSubmitHandler(function(data) {
        account.setAppointment(KEY, PICTURE_KEY, data);
    });
    console.log(formHandler);

})(window);