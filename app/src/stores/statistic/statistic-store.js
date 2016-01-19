"use strict";
var action_type_enums_1 = require('../../actions/action-type-enums');
var statistic_1 = require('../../domain/statistics/statistic');
var statistic_type_enum_1 = require('../../domain/statistics/statistic-type-enum');
var api_url_const_1 = require('../../services/server/api-url-const');
var immutable_1 = require('immutable');
var Rx = require('rx');
var StatisticsStore = (function () {
    function StatisticsStore(dispatcher, server) {
        this.dispatcher = dispatcher;
        this.server = server;
        this.registerActionHandlers();
        this.initialize();
    }
    Object.defineProperty(StatisticsStore.prototype, "Statistics", {
        get: function () {
            return this.statistics.toJS();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatisticsStore.prototype, "StatisticsSubject", {
        get: function () {
            return this.statisticsSubject;
        },
        enumerable: true,
        configurable: true
    });
    StatisticsStore.prototype.initialize = function () {
        this.statistics = immutable_1.List();
        this.statisticsSubject = new Rx.ReplaySubject(1);
    };
    StatisticsStore.prototype.registerActionHandlers = function () {
        var _this = this;
        this.dispatcher.filter(function (action) { return action.actionType === action_type_enums_1.StatisticActionType.LoadStatistics; })
            .subscribe(function (action) { return _this.loadStatistics(action.statisticTypes); });
        this.dispatcher.filter(function (action) { return action.actionType === action_type_enums_1.StatisticActionType.GetStatistics; })
            .subscribe(function (action) { return _this.getStatistics(action.statisticTypes, action.epochRange); });
    };
    StatisticsStore.prototype.loadStatistics = function (statisticTypes) {
        var _this = this;
        var whenStatisticTypesRecieved = Rx.Observable.fromArray(statisticTypes);
        var whenStatisticsLoaded = whenStatisticTypesRecieved.flatMap(function (statisticType) { return _this.server.get(api_url_const_1.STATISTIC_URLS.get(statisticType)); });
        whenStatisticsLoaded.subscribe(function (response) {
            var statisticType = statistic_type_enum_1.StatisticType[Object.keys(response.data)[0]];
            var data = response.data[statistic_type_enum_1.StatisticType[statisticType]];
            var statistic = _this.statistics.find(function (_) { return _.Type === statisticType; });
            if (statistic) {
                statistic.Value = data;
            }
            else {
                _this.statistics = _this.statistics.push(new statistic_1.Statistic(statisticType, data));
            }
        }, function (error) {
            _this.emitError(error);
        }, function () { return _this.emitChange(_this.Statistics); });
    };
    StatisticsStore.prototype.getStatistics = function (statisticType, epochRange) {
        console.log(epochRange);
        var result = this.statistics.map(function (statistic) {
            var data = statistic.Value;
            var filteredData = data.filter(function (d) {
                var ha = d.Date >= epochRange[0] && d.Date <= epochRange[1];
                return ha;
            });
            return filteredData;
        }).toJS();
        this.emitChange(result);
    };
    StatisticsStore.prototype.emitChange = function (result) {
        this.statisticsSubject.onNext(result);
    };
    StatisticsStore.prototype.emitError = function (error) {
        this.statisticsSubject.onError(error);
    };
    StatisticsStore.$inject = [
        'dispatcher',
        'server'
    ];
    return StatisticsStore;
}());
exports.StatisticsStore = StatisticsStore;
//# sourceMappingURL=statistic-store.js.map