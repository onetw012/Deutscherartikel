(function () {
	'use strict';
	angular.module('artikel')
	.controller('MainCtrl', ['$http', '$scope', 'WortModel', 'filterFilter',
		function($http, $scope, WortModel, filterFilter){
		$scope.model = WortModel.model;

		$scope.addWort = addWort;
		$scope.showArtikel = showArtikel;
		$scope.startTyping = startTyping;

		function addWort (artikel, wort) {
			wort = _trueWort(wort) || "";
			artikel = artikel || "";
			if(_trueArtikel(artikel) && wort){
				$http({method: 'POST', url: '/create', data: {art: artikel, wort: wort}})
				.success(function(data) {
						if (data !== "Der Wort ist schon im Woerterbuch") {
							$scope.model.box.push({art: artikel, wort: wort});
						} else {

						}									
					})
				.error(function(error) {

					});
			//------------------
			} else if (!_trueArtikel(artikel)){
				console.log("Ein Artikel passiert nicht!");
				alert("Ein Artikel passiert nicht!");
			} else {
				console.log("Ein Wort passiert nicht!");
				alert("Ein Wort passiert nicht!");
			}
		}
		
		function showArtikel (wort) {
			$scope.model.wort = wort;	
			$scope.model.suggestions.forEach(function (obj) {
				if(obj.wort === $scope.model.wort) {
					$scope.model.artikel = obj.art;
					return true;
				}
			});
			$scope.model.has = true;		
			$scope.model.clicked = true;
		}

		function startTyping () {
			$scope.model.clicked = false;
			$scope.model.has = false;
			$scope.model.suggestions = filterFilter($scope.model.box, {wort: $scope.model.wort});		
		};

		function _trueArtikel (artikel) {
			return (artikel === "der" || artikel === "das" || artikel === "die") ? true : false;
		};

		function _trueWort (wort) {
			wort = wort.trim().toLowerCase();
			wort = wort.charAt(0).toUpperCase() + wort.slice(1);
			var pattern = /^[A-Za-z]+$/;
			return (pattern.test(wort)) ? wort : false;
		};
		


	}]);
})();