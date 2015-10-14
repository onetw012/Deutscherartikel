(function () {
	'use strict';
	angular.module('artikel')
	.controller('MainCtrl', ['sender', '$scope', 'WortModel', 'filterFilter', 'toaster',
		function(sender, $scope, WortModel, filterFilter, toaster){
		$scope.model = WortModel.model;

		$scope.addWort = addWort;
		$scope.showArtikel = showArtikel;
		$scope.startTyping = startTyping;

		function addWort (artikel, wort) {
			wort = _trueWort(wort) || "";
			artikel = artikel || "";
			if(_trueArtikel(artikel) && wort){
				sender.sendWort({art: artikel, wort: wort})
				.then(function (data) {
					if (!data.exist) {
						toaster.pop('success', "Der Wort ist hinzugefuegt worden", undefined, 2000);
						$scope.model.box.push({art: artikel, wort: wort});
					} else {
						toaster.pop('error', "Der Wort ist schon im Woerterbuch", undefined, 2000);
					}
				})
				.catch(function (err) {
					toaster.pop('error', "Der Wort ist nicht hinzugefuegt worden", undefined, 2000);
				});
			//------------------
			} else if (!_trueArtikel(artikel)){
				toaster.pop('error', "Ein Artikel passiert nicht!", undefined, 2000);
			} else {
				toaster.pop('error', "Ein Wort passiert nicht!", undefined, 2000);
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