;(function () {

	'use strict';

	angular.module('artikel')
	.service('sender', ['$http', '$q', function ($http, $q) {
		
		this.sendWort = function (obj) {
			var deferred = $q.defer();
			if (typeof obj === 'object') {
				$http.post('/create', obj)
					.success(function (data) {
					deferred.resolve(data);
				})
				.error(function (err) {
					deferred.reject(err);
				});		
			} else {
				deferred.reject(new Error());
			}
			
			return deferred.promise;
		};
	}]);

})();