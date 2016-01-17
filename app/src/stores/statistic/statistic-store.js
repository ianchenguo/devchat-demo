"use strict";
var action_type_enums_1 = require('../../actions/action-type-enums');
var statistic_1 = require('../../domain/statistics/statistic');
var api_url_const_1 = require('../../services/server/api-url-const');
var immutable_1 = require('immutable');
var Rx = require('rx');
var StatisticStore = (function () {
    function StatisticStore(dispatcher, serverService) {
        this.dispatcher = dispatcher;
        this.serverService = serverService;
        this.registerActionHandlers();
        this.initialize();
    }
    Object.defineProperty(StatisticStore.prototype, "Statistics", {
        get: function () {
            return this.statistics.toJS();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StatisticStore.prototype, "StatisticsSubject", {
        get: function () {
            return this.statisticsSubject;
        },
        enumerable: true,
        configurable: true
    });
    StatisticStore.prototype.initialize = function () {
        this.statistics = immutable_1.List();
        this.statisticsSubject = new Rx.ReplaySubject(1);
    };
    StatisticStore.prototype.registerActionHandlers = function () {
        var _this = this;
        this.dispatcher.filter(function (action) { return action.actionType === action_type_enums_1.StatisticActionType.GetStatistic; })
            .subscribe(function (action) { return _this.getStatistic(action.statisticType); });
    };
    StatisticStore.prototype.getStatistic = function (statisticType) {
        var _this = this;
        this.serverService.get("" + api_url_const_1.API_BASE_URL + api_url_const_1.STATISTIC_URLS[statisticType])
            .subscribe(function (value) {
            var statistic = _this.statistics.find(function (_) { return _.Type === statisticType; });
            if (statistic) {
                statistic.Value = value.data;
            }
            else {
                _this.statistics.push(new statistic_1.Statistic(statisticType, value.data));
            }
            _this.emitChange();
        }, function (error) {
            _this.emitError(error);
        });
    };
    StatisticStore.prototype.emitChange = function () {
        this.statisticsSubject.onNext(this.Statistics);
    };
    StatisticStore.prototype.emitError = function (error) {
        this.statisticsSubject.onError(error);
    };
    StatisticStore.$inject = [
        'dispatcher',
        'ServerService'
    ];
    return StatisticStore;
}());
exports.StatisticStore = StatisticStore;
//# sourceMappingURL=statistic-store.js.map