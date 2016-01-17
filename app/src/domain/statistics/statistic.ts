import {StatisticType} from './statistic-type-enum';

export class Statistic {
  constructor(public Type: StatisticType, public Value: any) {}
}
