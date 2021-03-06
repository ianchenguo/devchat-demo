"use strict";
var statistic_type_enum_1 = require('../../domain/statistics/statistic-type-enum');
var rate_trends_constants_1 = require('./rate-trends-constants');
var moment = require('moment');
var RateTrendsHeaderComponent = (function () {
    function RateTrendsHeaderComponent($scope, statisticActions, dateService) {
        this.$scope = $scope;
        this.statisticActions = statisticActions;
        this.dateService = dateService;
        this.initDates();
    }
    RateTrendsHeaderComponent.prototype.initDates = function () {
        this.beginDate = new Date(rate_trends_constants_1.BEGIN_DATE);
        this.endDate = new Date();
        this.selectedBeginDate = { DateString: moment(this.beginDate).format('YYYY/MM') };
        this.selectedEndDate = { DateString: moment(this.endDate).format('YYYY/MM') };
        this.availableDates = this.dateService.GetMonthYears(this.beginDate, this.endDate);
    };
    RateTrendsHeaderComponent.prototype.getStatistics = function (beginDate, endDate) {
        var beginEpoch = moment(new Date(beginDate.DateString)).valueOf();
        var endEpoch = moment(new Date(endDate.DateString)).valueOf();
        var statisticTypes = [statistic_type_enum_1.StatisticType.ConsumerProductIndexes, statistic_type_enum_1.StatisticType.VolumeInMarketplaces];
        this.statisticActions.GetStatistics(statisticTypes, [beginEpoch, endEpoch]);
    };
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