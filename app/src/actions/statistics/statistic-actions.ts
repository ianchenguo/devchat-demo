import {StatisticActionType} from '../action-type-enums';
import {StatisticType} from '../../domain/statistics/statistic-type-enum';

export class StatisticActions {

  static $inject = ['dispatcher'];

  constructor(
    private dispatcher: Rx.Subject<any>) { }

  GetStatistic(statisticType: StatisticType) {
    this.dispatcher.onNext({
      actionType: StatisticActionType.GetStatistic,
      statisticType: statisticType
    });
  }
}
