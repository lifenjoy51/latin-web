'use strict';

angular.module('latinApp.version', [
  'latinApp.version.interpolate-filter',
  'latinApp.version.version-directive'
])

.value('version', '0.1');
