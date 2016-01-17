import 'angular-ui-router';
import 'lodash-compat';

import 'basscss/css/basscss.css';
import 'font-awesome/css/font-awesome.css';
import '../css/styles.css';

import * as angular from 'angular';
import * as Rx from 'rx';

import {
  ServerService,
} from './services';

import {
  StatisticStore
} from './stores';

import {
  RateTrendsComponent
} from './components';

import {
  StatisticActions
} from './actions';


// angular.module('ngcourse.router', ['ui.router'])
//   .config(RouterConfig)
//   .service('router', RouterService);

angular.module('ngcourse.server', [])
  .service('server', ServerService);

angular.module('ngcourse.dispatcher', [])
  .service('dispatcher', Rx.Subject);

angular.module('ngcourse.statistics', [])
  .service('statisticStore', StatisticStore)
  .service('statisticActions', StatisticActions)
  .directive(
    RateTrendsComponent.selector,
    RateTrendsComponent.directiveFactory);

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
