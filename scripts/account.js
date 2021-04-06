(function (window) {
    'use strict';
    var App = window.App || {};

    function Account(key, db) {
        this.db = db;
        this.key = key;
    }

    Account.prototype.listPlayDates = function (fn) {
        this.db.getAppointments(this.key, fn);
    };

    App.Account = Account;
    window.App = App;

})(window);