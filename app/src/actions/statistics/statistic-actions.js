"use strict";
var action_type_enums_1 = require('../action-type-enums');
var StatisticActions = (function () {
    function StatisticActions(dispatcher) {
        this.dispatcher = dispatcher;
    }
    StatisticActions.prototype.GetStatistic = function (statisticType) {
        this.dispatcher.onNext({
            actionType: action_type_enums_1.StatisticActionType.GetStatistic,
            statisticType: statisticType
        });
    };
    StatisticActions.$inject = ['dispatcher'];
    return StatisticActions;
}());
exports.StatisticActions = StatisticActions;
//# sourceMappingURL=statistic-actions.js.map