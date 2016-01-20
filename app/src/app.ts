import 'angular-ui-router';
import 'lodash-compat';

// import 'basscss/css/basscss.css';
// import 'font-awesome/css/font-awesome.css';
import '../css/styles.css';

import * as angular from 'angular';
import * as Rx from 'rx';

import {
  ServerService,
  DateService
} from './services';

import {
  StatisticsStore
} from './stores';

import {
  RateTrendsComponent,
  RateTrendsHeaderComponent,
  RateTrendsGraphsComponent
} from './components';

import {
  StatisticActions
} from './actions';


// angular.module('ngcourse.router', ['ui.router'])
//   .config(RouterConfig)
//   .service('router', RouterService);

angular.module('ngcourse.server', [])
  .service('server', ServerService)
  .service('dateService', DateService);

angular.module('ngcourse.dispatcher', [])
  .service('dispatcher', Rx.Subject);

angular.module('ngcourse.statistics', [])
  .service('statisticsStore', StatisticsStore)
  .service('statisticActions', StatisticActions)
  .directive(
    RateTrendsComponent.selector,
    RateTrendsComponent.directiveFactory)
  .directive(
    RateTrendsHeaderComponent.selector,
    RateTrendsHeaderComponent.directiveFactory)
  .directive(
    RateTrendsGraphsComponent.selector,
    RateTrendsGraphsComponent.directiveFactory);

angular.module('ngcourse', [
  'ngcourse.statistics',
  'ngcourse.server',
  // 'ngcourse.router',
  'ngcourse.dispatcher']);
  // .directive(
  //   MainComponent.selector,
  //   MainComponent.directiveFactory);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['ngcourse']);
});
