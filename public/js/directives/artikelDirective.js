(function () {
	"use strict";
	angular
		.module('artikel')
		.directive('artikelplatz', function(){
			return {
				restrict: "E",
				scope: {
					clicked: '=',
					artikel: '@'
				},
				link: function (scope, element, attrs, mainCtrl) {
					element.html(scope.artikel);
				},
				templateUrl: 'artikelPart.html'
			}
		});
})();
