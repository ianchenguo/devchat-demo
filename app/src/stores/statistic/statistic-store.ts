import {StatisticActionType} from '../../actions/action-type-enums';
import {Statistic} from '../../domain/statistics/statistic';
import {StatisticType} from '../../domain/statistics/statistic-type-enum';
import {ServerService} from '../../services';
import {API_BASE_URL, STATISTIC_URLS}
  from '../../services/server/api-url-const';

import {Map, List, fromJS} from 'immutable';
import * as Rx from 'rx';

export class StatisticsStore {

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
    this.dispatcher.filter(action => action.actionType === StatisticActionType.LoadStatistics)
      .subscribe(action => this.loadStatistics(action.statisticTypes));

    this.dispatcher.filter(action => action.actionType === StatisticActionType.GetStatistics)
      .subscribe(action => this.getStatistics(action.statisticTypes, action.epochRange));
  }

  private loadStatistics(statisticTypes: Array<StatisticType>) {
    let whenStatisticTypesRecieved = Rx.Observable.fromArray(statisticTypes);
    let whenStatisticsLoaded = whenStatisticTypesRecieved.flatMap(statisticType => this.server.get(STATISTIC_URLS.get(statisticType)));

    whenStatisticsLoaded.subscribe(
      response => {
        let statisticType: StatisticType = StatisticType[Object.keys(response.data)[0] as string];
        let data = response.data[StatisticType[statisticType]];
        let statistic: Statistic = this.statistics.find(_ => _.Type === statisticType);

        if (statistic) {
          statistic.Value = data;
        } else {
          this.statistics = this.statistics.push(new Statistic(statisticType, data));
        }
      },
      error => {
        this.emitError(error);
      },
      () => this.emitChange(this.Statistics));
  }

  private getStatistics(statisticType: Array<StatisticType>, epochRange: Array<number>){
    console.log(epochRange);
    let result = this.statistics.map(statistic => {
          let data = statistic.Value as Array<any>;
          let filteredData =  data.filter(d => {
            let ha = d.Date >= epochRange[0] &&  d.Date <= epochRange[1];
            return ha;
          });
          return filteredData;
      }).toJS();

    this.emitChange(result);
  }

  private emitChange(result) {
    this.statisticsSubject.onNext(result);
  }

  private emitError(error) {
    this.statisticsSubject.onError(error);
  }
}
