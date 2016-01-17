import {StatisticActionType} from '../../actions/action-type-enums';
import {Statistic} from '../../domain/statistics/statistic';
import {StatisticType} from '../../domain/statistics/statistic-type-enum';
import {ServerService} from '../../services';
import {API_BASE_URL, STATISTIC_URLS}
  from '../../services/server/api-url-const';

import {Map, List, fromJS} from 'immutable';
import * as Rx from 'rx';

export class StatisticStore {

  private statisticsSubject: Rx.ReplaySubject<any>;
  private statistics: List<Statistic>;

  get Statistics() {
    return this.statistics.toJS();
  }

  get StatisticsSubject() {
    return this.statisticsSubject;
  }

  static $inject = [
    'dispatcher',
    'server'
  ];

  constructor(
    private dispatcher: Rx.Subject<any>,
    private server: ServerService
  ) {
    this.registerActionHandlers();
    this.initialize();
  }

  private initialize() {
    this.statistics = List<Statistic>();
    this.statisticsSubject = new Rx.ReplaySubject(1);
  }

  private registerActionHandlers() {
    this.dispatcher.filter(
      action => action.actionType === StatisticActionType.GetStatistic)
      .subscribe(action => this.getStatistic(action.statisticType));
  }

  private getStatistic(statisticType: StatisticType) {
    this.server.get(STATISTIC_URLS.get(statisticType))
    .subscribe(
      (response) => {
        let data = response.data[StatisticType[statisticType]];
        let statistic: Statistic =
          this.statistics.find(_ => _.Type === statisticType);

        if (statistic) {
          statistic.Value = data;
        } else {
          this.statistics = this.statistics.push(new Statistic(statisticType, data));
        }

        this.emitChange();

      },
      (error) => {
        this.emitError(error);
      });
  }

  private emitChange() {
    this.statisticsSubject.onNext(this.Statistics);
  }

  private emitError(error) {
    this.statisticsSubject.onError(error);
  }
}
