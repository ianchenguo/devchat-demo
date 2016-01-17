"use strict";
var statistic_type_enum_1 = require('../../domain/statistics/statistic-type-enum');
var immutable_1 = require('immutable');
var RateTrendsComponent = (function () {
    function RateTrendsComponent($scope, statisticStore, statisticActions) {
        var _this = this;
        this.$scope = $scope;
        this.statisticStore = statisticStore;
        this.statisticActions = statisticActions;
        this.statistics = immutable_1.List();
        var statisticSubscription = this.statisticStore.StatisticsSubject.subscribe(function (statistics) {
            _this.statistics = statistics;
            console.log(_this.statistics);
        }, function (error) { return _this.errorMessage = error; });
        this.$scope.$on('$destroy', function () {
            statisticSubscription.dispose();
        });
        this.statisticActions.GetStatistic(statistic_type_enum_1.StatisticType.ConsumerProductIndexes);
    }
    Object.defineProperty(RateTrendsComponent.prototype, "Statistics", {
        get: function () {
            return this.statistics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateTrendsComponent.prototype, "ErrorMessage", {
        get: function () {
            return this.errorMessage;
        },
        enumerable: true,
        configurable: true
    });
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
        'statisticStore',
        'statisticActions'
    ];
    return RateTrendsComponent;
}());
exports.RateTrendsComponent = RateTrendsComponent;
//# sourceMappingURL=rate-trends-component.js.map