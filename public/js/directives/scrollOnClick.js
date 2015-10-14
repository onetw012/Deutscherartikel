;(function () {

	'use strict';

	angular.module('artikel')
	.directive('scrollOnClick', [function () {
		return {
			restrict: 'A',
			link: function (scope, el) {
				el.on('click', function () {
					$('body').animate({scrollTop: 0}, 'slow');
				});
			}
		}
	}]);

})();