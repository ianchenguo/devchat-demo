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
  DateString: string,
  Epoch: number
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
    this.statisticActions.GetStatistic(StatisticType.ConsumerProductIndexes);
    this.initDates();

  }

  private initDates(){

    this.beginDate = new Date(BEGIN_DATE);
    this.endDate = new Date();

    this.selectedBeginDate = {
        DateString: moment(this.beginDate).format('YYYY/MM'),
        Epoch: moment(this.beginDate).valueOf() };
    this.selectedEndDate = {
        DateString: moment(this.endDate).format('YYYY/MM'),
        Epoch: moment(this.endDate).valueOf() };
        console.log(this.selectedBeginDate);
        console.log(this.selectedEndDate);
    this.availableDates = this.dateService.GetMonthYears(this.beginDate, this.endDate);
    console.log(this.availableDates);
  }

  get ErrorMessage() {
    return this.errorMessage;
  }

}
