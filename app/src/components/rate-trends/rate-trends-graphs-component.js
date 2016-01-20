"use strict";
var statistic_type_enum_1 = require('../../domain/statistics/statistic-type-enum');
var immutable_1 = require('immutable');
var Rx = require('rx');
;
function link(scope, element) {
    var chartData = [];
    var chartOptions = {};
    var $canvas = $('.plot-canvas');
    scope.ctrl.whenChartDataUpdated.subscribe(function (value) {
        chartData = value.ChartData;
        chartOptions = value.ChartOptions;
        var plot = $.plot($canvas, value.ChartData, value.ChartOptions);
    });
    var throttled = Rx.Observable.fromEvent($(window), 'resize')
        .skipUntil(scope.ctrl.whenChartDataUpdated)
        .throttle(250)
        .subscribe(function (value) {
        var plot = $.plot($canvas, chartData, chartOptions);
    });
}
var RateTrendsGraphsComponent = (function () {
    function RateTrendsGraphsComponent($scope, statisticsStore, statisticActions) {
        var _this = this;
        this.$scope = $scope;
        this.statisticsStore = statisticsStore;
        this.statisticActions = statisticActions;
        this.statistics = immutable_1.List();
        this.whenChartDataUpdated = new Rx.ReplaySubject(1);
        var statisticSubscription = this.statisticsStore.StatisticsSubject.subscribe(function (statistics) {
            _this.statistics = immutable_1.List(statistics);
            _this.populateChart(_this.statistics);
        }, function (error) { return _this.errorMessage = error; });
        this.$scope.$on('$destroy', function () {
            statisticSubscription.dispose();
        });
    }
    RateTrendsGraphsComponent.prototype.populateChart = function (statistics) {
        var epochList = immutable_1.List();
        statistics.map(function (s) {
            var currMax = immutable_1.List(s.Value).maxBy(function (v) { return v.Date; }).Date;
            var currMin = immutable_1.List(s.Value).minBy(function (v) { return v.Date; }).Date;
            epochList = epochList.push(currMax).push(currMin);
        });
        var formatNumberShortening = function (n) {
            var numPart = n;
            var endLetter = '';
            if (n >= 1000000) {
                numPart = Math.round(n / 100000) / 10;
                endLetter = 'm';
            }
            else if (n > 1000) {
                numPart = Math.round(n / 100) / 10;
                endLetter = 'k';
            }
            return numPart + endLetter;
        };
        var chartOptions = {
            canvas: false,
            legend: {
                show: false
            },
            crosshair: {
                mode: "x"
            },
            pan: {
                interactive: true
            },
            grid: {
                hoverable: true,
                autoHighlight: false
            },
            xaxis: {
                mode: "time",
                timeformat: "%d/%m/%y",
                zoomRange: false,
                panRange: false,
                min: epochList.min(),
                max: epochList.max(),
                minTickSize: [10, "day"]
            },
            yaxes: [
                {
                    position: "left",
                    zoomRange: false,
                    panRange: false,
                    tickFormatter: function (v) {
                        return v.toFixed(1) + "%";
                    }
                }, {
                    position: "right",
                    zoomRange: false,
                    panRange: false,
                    tickFormatter: function (v) {
                        return formatNumberShortening(v);
                    }
                }
            ]
        };
        var chartData = {
            "Volume": {
                label: "Weekly Volume",
                data: statistics.find(function (s) { return s.Type == statistic_type_enum_1.StatisticType.VolumeInMarketplaces; }).Value.map(function (v) {
                    return [
                        v.Date,
                        Number(v.Volume)
                    ];
                }),
                color: "#D2D2D2",
                column: 6,
                yaxis: 2,
                key: "Volume",
                checked: false,
                bars: {
                    show: true,
                    barWidth: 604800000
                }
            },
            "CPI": {
                label: "CPI",
                data: statistics.find(function (s) { return s.Type == statistic_type_enum_1.StatisticType.ConsumerProductIndexes; }).Value.map(function (v) {
                    return [
                        v.Date,
                        Number(v.Value)
                    ];
                }),
                color: "#86CB00",
                column: 5,
                yaxis: 1,
                key: "CPI",
                checked: true,
                lines: {
                    show: true,
                    steps: true
                }
            }
        };
        this.whenChartDataUpdated.onNext({ ChartData: [chartData.Volume, chartData.CPI], ChartOptions: chartOptions });
    };
    RateTrendsGraphsComponent.selector = 'rsRateTrendsGraphs';
    RateTrendsGraphsComponent.directiveFactory = function () { return ({
        restrict: 'E',
        controllerAs: 'ctrl',
        scope: {},
        bindToController: true,
        controller: RateTrendsGraphsComponent,
        link: link,
        template: require('./rate-trends-graphs-component.html')
    }); };
    RateTrendsGraphsComponent.$inject = [
        '$scope',
        'statisticsStore',
        'statisticActions'
    ];
    return RateTrendsGraphsComponent;
}());
exports.RateTrendsGraphsComponent = RateTrendsGraphsComponent;
//# sourceMappingURL=rate-trends-graphs-component.js.map