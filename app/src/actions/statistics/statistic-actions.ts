import {StatisticActionType} from '../action-type-enums';
import {StatisticType} from '../../domain/statistics/statistic-type-enum';

export class StatisticActions {

  static $inject = ['dispatcher'];

  constructor(
    private dispatcher: Rx.Subject<any>) { }

  LoadStatistics(statisticTypes: Array<StatisticType>) {
    this.dispatcher.onNext({
      actionType: StatisticActionType.LoadStatistics,
      statisticTypes: statisticTypes
    });
  }

  GetStatistics(statisticTypes: Array<StatisticType>, epochRange: Array<number>) {
    this.dispatcher.onNext({
      actionType: StatisticActionType.GetStatistics,
      statisticTypes: statisticTypes,
      epochRange: epochRange
    });
  }
}
