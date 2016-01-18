"use strict";
var statistic_type_enum_1 = require('../../domain/statistics/statistic-type-enum');
var rate_trends_constants_1 = require('./rate-trends-constants');
var moment = require('moment');
var RateTrendsHeaderComponent = (function () {
    function RateTrendsHeaderComponent($scope, statisticActions, dateService) {
        this.$scope = $scope;
        this.statisticActions = statisticActions;
        this.dateService = dateService;
        this.statisticActions.GetStatistic(statistic_type_enum_1.StatisticType.ConsumerProductIndexes);
        this.initDates();
    }
    RateTrendsHeaderComponent.prototype.initDates = function () {
        this.beginDate = new Date(rate_trends_constants_1.BEGIN_DATE);
        this.endDate = new Date();
        this.selectedBeginDate = {
            DateString: moment(this.beginDate).format('YYYY/MM'),
            Epoch: moment(this.beginDate).valueOf() };
        this.selectedEndDate = {
            DateString: moment(this.endDate).format('YYYY/MM'),
            Epoch: moment(this.endDate).valueOf() };
        console.log(this.selectedBeginDate);
        console.log(this.selectedEndDate);
        this.availableDates = this.dateService.GetMonthYears(this.beginDate, this.endDate);
        console.log(this.availableDates);
    };
    Object.defineProperty(RateTrendsHeaderComponent.prototype, "ErrorMessage", {
        get: function () {
            return this.errorMessage;
        },
        enumerable: true,
        configurable: true
    });
    RateTrendsHeaderComponent.selector = 'rsRateTrendsHeader';
    RateTrendsHeaderComponent.directiveFactory = function () { return ({
        restrict: 'E',
        controllerAs: 'ctrl',
        scope: {},
        bindToController: true,
        controller: RateTrendsHeaderComponent,
        template: require('./rate-trends-header-component.html')
    }); };
    RateTrendsHeaderComponent.$inject = [
        '$scope',
        'statisticActions',
        'dateService'
    ];
    return RateTrendsHeaderComponent;
}());
exports.RateTrendsHeaderComponent = RateTrendsHeaderComponent;
//# sourceMappingURL=rate-trends-header-component.js.map