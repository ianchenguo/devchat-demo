"use strict";
var rx = require('rx');
var ServerService = (function () {
    function ServerService($http, API_BASE_URL) {
        this.$http = $http;
        this.API_BASE_URL = API_BASE_URL;
        this.API_BASE_URL = API_BASE_URL;
    }
    ServerService.prototype.get = function (path) {
        return rx.Observable.fromPromise(this.$http.get(this.API_BASE_URL + path));
    };
    ServerService.$inject = [
        '$http'
    ];
    return ServerService;
}());
exports.ServerService = ServerService;
//# sourceMappingURL=server-service.js.map