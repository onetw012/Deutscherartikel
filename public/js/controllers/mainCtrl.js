(function () {
	'use strict';
	angular.module('artikel')
	.controller('MainCtrl', ['$scope', '$http', 'filterFilter', function($scope, $http, filterFilter){

		var vm = this,
		Model = (function() {
			/*		constructor		*/
			function Model () {
				
			}

			/*		variables		*/
			wort: "";
			artikel: "";
			box: [];
			suggestions: [];
			has: false;
			clicked: false;	
			/*----------------------*/

			/*		functions		*/
			addWort: addWort;
			showArtikel: showArtikel;
			startTyping: startTyping;
			trueArtikel: trueArtikel;
			trueWort: trueWort;
			/*----------------------*/

			return this;
		})();

		$scope.model = new Model();

		

		


		$http({method: 'GET', url: '/art'})
		.success(function(data){
			$scope.box = data;
		})
		.error(function(err){
			console.log("Can't load data!");
		});

		function addWort (artikel, wort) {
			wort = $scope.trueWort(wort) || "";
			artikel = artikel || "";
			

			if($scope.trueArtikel(artikel) && wort){
				$http({method: 'POST', url: '/create', data: {art: artikel, wort: wort}})
				.success(function(data, status, headers, config) {
		    			//console.log(headers);
		    			$scope.box.push({art: artikel, wort: wort});
		    		})
				.error(function(data, status, headers, config) {
		   				//console.log("ERROR!: " + data + status + headers + config);
		   			});
				
			} else if (!$scope.trueArtikel(artikel)){
				console.log("Ein Artikel passiert nicht!");
				alert("Ein Artikel passiert nicht!");
			} else {
				console.log("Ein Wort passiert nicht!");
				alert("Ein Wort passiert nicht!");
			}
		}
		

		function showArtikel (wort) {
			$scope.wort = wort;	
			$scope.suggestions.forEach(function (obj) {
				if(obj.wort === $scope.wort) {
					$scope.artikel = obj.art;
					return true;
				}
			});
			//console.log($scope.suggestions);
			$scope.has = true;		
			$scope.clicked = true;
		}

		function startTyping () {
			$scope.clicked = false;
			$scope.has = false;
			$scope.suggestions = filterFilter($scope.box, {wort: $scope.wort});		
		};

		function trueArtikel (artikel) {
			if (artikel === "der" || artikel === "das" || artikel === "die"){
				return true;
			} else {
				return false;
			}
		};

		function trueWort (wort) {
			wort = wort.trim().toLowerCase();
			wort = wort.charAt(0).toUpperCase() + wort.slice(1);
			var pattern = /^[A-Za-z]+$/;
			if(pattern.test(wort)){
				return wort;
			} else {
				return false;
			}
			
		};
		


	}]);
})();