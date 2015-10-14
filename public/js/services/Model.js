;(function () {
	"use strict";
	angular.module('artikel')
	.service('WortModel', ['$http', 'filterFilter', '$rootScope', '$timeout', 
	function ($http, filterFilter, $rootScope, $timeout) {

		var vm = this;
		this.model = {
			wort: "",
			artikel: "",
			box: [],
			suggestions: [],
			has: false,
			clicked: false
		};

		$http({method: 'GET', url: '/art'})
		.success(function(data){
			vm.model.box = data;
		})
		.error(function(err){
			console.log("Can't load data!" + "\n" + "ERROR!: " + err);
		});


		this.update = function () {
			$timeout(function() {$rootScope.$broadcast('update', vm.model.box);});
		};

		return this;

	}]);
})();