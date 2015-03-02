var app = angular.module('artikel', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){

	$scope.wort = "";
	$scope.has = false;
	$scope.suggestions = [];
	$scope.clicked = false;

	$scope.addArtikel = function(a, wort){
		$scope.suggestions.push({
			art: a,
			wort: wort
		});
	};

	$scope.showArtikel = function (wort) {
		$scope.has = true;
		$scope.wort = wort;
		$scope.clicked = true;
	}

	$scope.startTyping = function () {
		$scope.clicked = false;
	};

	$http({method: 'GET', url: '/art'}).
		success(function(data){
			$scope.suggestions = data;
		});


}]);