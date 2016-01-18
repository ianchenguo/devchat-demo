import {Map, List, fromJS} from 'immutable';
import * as Rx from 'rx';
import * as moment from 'moment';

export interface IMonthYear {
  Month:string;
  Year: string;
}

export class DateService {

  constructor() {}

  public GetMonthYears(beginDate:Date, endDate:Date): Array<string>{
    let range = moment.range(moment(beginDate), moment(endDate).endOf('month'));
    let monthYears: Array<string> = [];
    range.by('months', moment => {
      monthYears.push(moment.format('YYYY/MM'));
    }, false);
    return monthYears;
  }
}
