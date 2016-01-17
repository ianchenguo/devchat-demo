"use strict";
var immutable_1 = require('immutable');
var statistic_type_enum_1 = require('../../domain/statistics/statistic-type-enum');
exports.API_BASE_URL = 'https://api.ratesetter.com.au';
exports.STATISTIC_URLS = immutable_1.Map([
    [statistic_type_enum_1.StatisticType.ConsumerProductIndexes, '/statistic/ConsumerProductIndexes'],
    [statistic_type_enum_1.StatisticType.VolumeInMarketplaces, '/loans/stats/VolumeInMarketplaces']
]);
//# sourceMappingURL=api-url-const.js.map