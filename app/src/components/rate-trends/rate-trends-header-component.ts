import {StatisticsStore} from '../../stores';
import {StatisticActions} from '../../actions';
import {StatisticActionType} from '../../actions/action-type-enums';
import {Statistic} from '../../domain/statistics/statistic';
import {StatisticType} from '../../domain/statistics/statistic-type-enum';
import {BEGIN_DATE} from './rate-trends-constants';
import {IMonthYear, DateService} from '../../services/date/date-service';

import {Map, List, fromJS} from 'immutable';
import * as Rx from 'rx';
import * as moment from 'moment';

interface ISelectedDate {
  DateString: string
}

export class RateTrendsHeaderComponent {

  static selector: string = 'rsRateTrendsHeader';

  static directiveFactory: ng.IDirectiveFactory = () => ({
    restrict: 'E',
    controllerAs: 'ctrl',
    scope: {},
    bindToController: true,
    controller: RateTrendsHeaderComponent,
    template: require('./rate-trends-header-component.html')
  });

  static $inject = [
    '$scope',
    'statisticActions',
    'dateService'
  ];

  private errorMessage: string;
  private beginDate: Date;
  private endDate: Date;
  private availableDates: Array<string>;
  private selectedBeginDate: ISelectedDate;
  private selectedEndDate: ISelectedDate;

  constructor(
    private $scope: ng.IScope,
    private statisticActions: StatisticActions,
    private dateService: DateService
  ) {
    this.initDates();
  }

  private initDates(){

    this.beginDate = new Date(BEGIN_DATE);
    this.endDate = new Date();

    this.selectedBeginDate = {DateString: moment(this.beginDate).format('YYYY/MM')};

    this.selectedEndDate = {DateString: moment(this.endDate).format('YYYY/MM')};

    this.availableDates = this.dateService.GetMonthYears(this.beginDate, this.endDate);
  }

  private getStatistics(beginDate:ISelectedDate, endDate:ISelectedDate){
    let beginEpoch = moment(new Date(beginDate.DateString)).valueOf();
    let endEpoch = moment(new Date(endDate.DateString)).valueOf();

    let statisticTypes: Array<StatisticType> = [StatisticType.ConsumerProductIndexes, StatisticType.VolumeInMarketplaces];
    this.statisticActions.GetStatistics(statisticTypes, [beginEpoch, endEpoch]);
  }
}
