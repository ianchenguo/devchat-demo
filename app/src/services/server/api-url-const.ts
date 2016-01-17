
import {Map, fromJS} from 'immutable';
import {StatisticType} from '../../domain/statistics/statistic-type-enum';

export const API_BASE_URL: string = 'https://api.ratesetter.com.au';
export const STATISTIC_URLS: Map<StatisticType, string> =
  Map<StatisticType, string>(
    [
      [StatisticType.ConsumerProductIndexes, '/statistic/ConsumerProductIndexes'],
      [StatisticType.VolumeInMarketplaces, '/loans/stats/VolumeInMarketplaces']
    ]);
