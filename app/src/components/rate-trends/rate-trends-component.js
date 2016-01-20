"use strict";
var statistic_type_enum_1 = require('../../domain/statistics/statistic-type-enum');
var immutable_1 = require('immutable');
var RateTrendsComponent = (function () {
    function RateTrendsComponent($scope, statisticsStore, statisticActions) {
        this.$scope = $scope;
        this.statisticsStore = statisticsStore;
        this.statisticActions = statisticActions;
        this.statistics = immutable_1.List();
        this.statisticActions.LoadStatistics([statistic_type_enum_1.StatisticType.ConsumerProductIndexes, statistic_type_enum_1.StatisticType.VolumeInMarketplaces]);
    }
    RateTrendsComponent.selector = 'rsRateTrends';
    RateTrendsComponent.directiveFactory = function () { return ({
        restrict: 'E',
        controllerAs: 'ctrl',
        scope: {},
        bindToController: true,
        controller: RateTrendsComponent,
        template: require('./rate-trends-component.html')
    }); };
    RateTrendsComponent.$inject = [
        '$scope',
        'statisticsStore',
        'statisticActions'
    ];
    return RateTrendsComponent;
}());
exports.RateTrendsComponent = RateTrendsComponent;
//# sourceMappingURL=rate-trends-component.js.map