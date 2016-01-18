import {StatisticsStore} from '../../stores';
import {StatisticActions} from '../../actions';
import {StatisticActionType} from '../../actions/action-type-enums';
import {Statistic} from '../../domain/statistics/statistic';
import {StatisticType} from '../../domain/statistics/statistic-type-enum';

import {Map, List, fromJS} from 'immutable';
import * as Rx from 'rx';

export class RateTrendsComponent {

  static selector: string = 'rsRateTrends';

  static directiveFactory: ng.IDirectiveFactory = () => ({
    restrict: 'E',
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    controller: RateTrendsComponent,
    template: require('./rate-trends-component.html')
  });

  static $inject = [
    '$scope',
    'statisticsStore',
    'statisticActions'
  ];

  private statistics: List<Statistic>;
  private errorMessage: string;
  constructor(
    private $scope: ng.IScope,
    private statisticsStore: StatisticsStore,
    private statisticActions: StatisticActions
  ) {
    this.statistics = List<Statistic>();

    let statisticSubscription = this.statisticsStore.StatisticsSubject.subscribe(
      statistics => {
        this.statistics = statistics;
        console.log(this.statistics);
      },
      error => this.errorMessage = error);

    this.$scope.$on('$destroy', () => {
      statisticSubscription.dispose();
    });

    this.statisticActions.GetStatistic(StatisticType.ConsumerProductIndexes);
  }

  get Statistics() {
    return this.statistics;
  }

  get ErrorMessage() {
    return this.errorMessage;
  }
}
