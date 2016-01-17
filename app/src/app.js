"use strict";
require('angular-ui-router');
require('lodash-compat');
require('basscss/css/basscss.css');
require('font-awesome/css/font-awesome.css');
require('../css/styles.css');
var angular = require('angular');
var Rx = require('rx');
var services_1 = require('./services');
var stores_1 = require('./stores');
var components_1 = require('./components');
var actions_1 = require('./actions');
// angular.module('ngcourse.router', ['ui.router'])
//   .config(RouterConfig)
//   .service('router', RouterService);
console.log(stores_1.StatisticStore);
angular.module('ngcourse.statistics', [])
    .service('StatisticStore', stores_1.StatisticStore)
    .service('statisticActions', actions_1.StatisticActions)
    .directive(components_1.RateTrendsComponent.selector, components_1.RateTrendsComponent.directiveFactory);
angular.module('ngcourse.server', [])
    .service('server', services_1.ServerService);
angular.module('ngcourse.dispatcher', [])
    .service('dispatcher', Rx.Subject);
angular.module('ngcourse', [
    'ngcourse.statistics',
    'ngcourse.server',
    // 'ngcourse.router',
    'ngcourse.dispatcher']);
// .directive(
//   MainComponent.selector,
//   MainComponent.directiveFactory);
angular.element(document).ready(function () {
    angular.bootstrap(document, ['ngcourse']);
});
//# sourceMappingURL=app.js.map