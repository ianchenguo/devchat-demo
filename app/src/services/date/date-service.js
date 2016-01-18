"use strict";
var moment = require('moment');
var DateService = (function () {
    function DateService() {
    }
    DateService.prototype.GetMonthYears = function (beginDate, endDate) {
        var range = moment.range(moment(beginDate), moment(endDate).endOf('month'));
        var monthYears = [];
        range.by('months', function (moment) {
            monthYears.push(moment.format('YYYY/MM'));
        }, false);
        return monthYears;
    };
    return DateService;
}());
exports.DateService = DateService;
//# sourceMappingURL=date-service.js.map