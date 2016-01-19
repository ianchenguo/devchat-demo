"use strict";
var action_type_enums_1 = require('../action-type-enums');
var StatisticActions = (function () {
    function StatisticActions(dispatcher) {
        this.dispatcher = dispatcher;
    }
    StatisticActions.prototype.LoadStatistics = function (statisticTypes) {
        this.dispatcher.onNext({
            actionType: action_type_enums_1.StatisticActionType.LoadStatistics,
            statisticTypes: statisticTypes
        });
    };
    StatisticActions.prototype.GetStatistics = function (statisticTypes, epochRange) {
        this.dispatcher.onNext({
            actionType: action_type_enums_1.StatisticActionType.GetStatistics,
            statisticTypes: statisticTypes,
            epochRange: epochRange
        });
    };
    StatisticActions.$inject = ['dispatcher'];
    return StatisticActions;
}());
exports.StatisticActions = StatisticActions;
//# sourceMappingURL=statistic-actions.js.map