(function (window) {
    'use strict';
    var LIST_SELECTOR = '[data-play-dates="list"]';
    var SERVER_URL = 'https://firestore.googleapis.com/v1';
    var App = window.App;
    var RemoteDataStore = App.RemoteDataStore;
    var Account = App.Account;
    var List = App.List;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var account = new Account(remoteDS);
    var list = new List(LIST_SELECTOR);
    account.listPlayDates(KEY, function(data) {
        list.init.call(list, data);
    });

})(window);