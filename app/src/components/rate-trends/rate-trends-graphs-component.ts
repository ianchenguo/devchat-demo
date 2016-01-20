import {StatisticsStore} from '../../stores';
import {StatisticActions} from '../../actions';
import {StatisticActionType} from '../../actions/action-type-enums';
import {Statistic} from '../../domain/statistics/statistic';
import {StatisticType} from '../../domain/statistics/statistic-type-enum';

import {Map, List, fromJS} from 'immutable';
import * as Rx from 'rx';
import * as jQuery from 'jquery';

interface IRateTrendsGraphsScope extends ng.IScope {
  ctrl: RateTrendsGraphsComponent;
};

interface ICharDataPair {
  ChartData: any,
  ChartOptions: any
}

function link(scope: IRateTrendsGraphsScope, element: ng.IAugmentedJQuery) {

  let chartData = [];
  let chartOptions = {};
  let $canvas = $('.plot-canvas');
  
  scope.ctrl.whenChartDataUpdated.subscribe(value => {
    chartData = value.ChartData;
    chartOptions = value.ChartOptions;
    let plot = $.plot($canvas, value.ChartData, value.ChartOptions);
  });

  let throttled = Rx.Observable.fromEvent($(window), 'resize')
                    .skipUntil(scope.ctrl.whenChartDataUpdated)
                    .throttle(250)
                    .subscribe(value => {
                      let plot = $.plot($canvas, chartData, chartOptions);
                    });

}

export class RateTrendsGraphsComponent {

  static selector: string = 'rsRateTrendsGraphs';

  static directiveFactory: ng.IDirectiveFactory = () => ({
    restrict: 'E',
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    controller: RateTrendsGraphsComponent,
    link: link,
    template: require('./rate-trends-graphs-component.html')
  });

  static $inject = [
    '$scope',
    'statisticsStore',
    'statisticActions'
  ];

  private statistics: List<Statistic>;
  private errorMessage: string;
  public whenChartDataUpdated: Rx.ReplaySubject<ICharDataPair>;

  constructor(
    private $scope: ng.IScope,
    private statisticsStore: StatisticsStore,
    private statisticActions: StatisticActions
  ) {

    this.statistics = List<Statistic>();
    this.whenChartDataUpdated = new Rx.ReplaySubject<ICharDataPair>(1);

    let statisticSubscription = this.statisticsStore.StatisticsSubject.subscribe(
      statistics => {
        this.statistics = List<Statistic>(statistics);
        this.populateChart(this.statistics);
      },
      error => this.errorMessage = error);

    this.$scope.$on('$destroy', () => {
      statisticSubscription.dispose();
    });
  }

  private populateChart(statistics: List<Statistic>) {

    let epochList: List<number> = List<number>();

    statistics.map(s => {
      let currMax = List<any>(s.Value).maxBy(v => v.Date).Date;
      let currMin = List<any>(s.Value).minBy(v => v.Date).Date;
      epochList = epochList.push(currMax).push(currMin);
    });

    let formatNumberShortening = (n) => {
        var numPart = n;
        var endLetter = '';
        if (n >= 1000000) {
            numPart = Math.round(n / 100000) / 10;
            endLetter = 'm';
        } else if (n > 1000) {
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
                tickFormatter: function(v) {
                    return v.toFixed(1) + "%";
                }
            }, {
                position: "right",
                zoomRange: false,
                panRange: false,
                tickFormatter: function(v) {
                    return formatNumberShortening(v);
                }
            }
        ]
    };

    let chartData = {
        "Volume": {
            label: "Weekly Volume",
            data: statistics.find(s => s.Type == StatisticType.VolumeInMarketplaces).Value.map(v => {
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
            data: statistics.find(s => s.Type == StatisticType.ConsumerProductIndexes).Value.map(v => {
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

    this.whenChartDataUpdated.onNext({ChartData: [chartData.Volume, chartData.CPI], ChartOptions: chartOptions});
  }
}
