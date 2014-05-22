// angular.module('app.filtes', [])
// .filter('checkmark', function() {
// 	return function(input) {    return input ? '\u2713' : '\u2718';  };
// })


// var myApp = angular.module('myApp',['app.filtes'])
angular.module('app',['ngRoute'])

.constant('SERVER_CONFIG', {
	baseUrl: 'http://localhost:5000/api/'
})
.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller:'ListCtrl',
		templateUrl:'list.html'
	})
	.when('/edit/:projectId', {
		controller:'EditCtrl',
		templateUrl:'detail.html'
	})
	.when('/new', {
		controller:'CreateCtrl',
		templateUrl:'detail.html'
	})
	.otherwise({
		redirectTo:'/'
	});
})
.controller('ListCtrl', function ($scope, $http, $log, SERVER_CONFIG) {
	var url = SERVER_CONFIG.baseUrl + 'persons/';
	$http.get(url).success(function(data){
		$scope.persons = data;
		$log.log(data);
	});
	$scope.refresh = function(){
		$http.get(url).success(function(data){
			$scope.persons = data;
			$log.log(data);
		});
	}
})
.controller('CreateCtrl', function($scope, $http, $log, $location, $timeout, SERVER_CONFIG) {
	var url = SERVER_CONFIG.baseUrl + 'persons/';
	$scope.save = function() {
		$http.post(url, $scope.item).success(function(data){
			// $scope.items = data;
			// $log.log(data);
			// $scope.items.unshift(data);
			$timeout(function() { $location.path('/'); });
		});
	};
})
.controller('EditCtrl', function($scope, $http, $log, $routeParams, $location, SERVER_CONFIG) {
	// var url = SERVER_CONFIG.baseUrl + 'persons/';
	// $scope.save = function() {
	// 	$http.post('http://localhost:5000/api/persons/', $scope.item).success(function(data){
	// 		// $scope.items = data;
	// 		$log.log(data);
	// 		$scope.items.unshift(data);
	// 		$timeout(function() { $location.path('/'); });
	// 	});
	// };
	var url = SERVER_CONFIG.baseUrl + 'persons/' + $routeParams.projectId;
	var urlsave = SERVER_CONFIG.baseUrl + 'persons/';
	$http.get(url).success(function(data){
		$scope.person = data; 
	});

	 	// var projectUrl = fbURL + $routeParams.projectId;
   //  $scope.project = $firebase(new Firebase(projectUrl));
   
   $scope.destroy = function() {
      // $scope.project.$remove();
      $http.delete(url).success(function(data){
      	$scope.person = null; 
      	$location.path('/');
      });
    };
    $scope.save = function() {
    	$scope.project.$save();
    	$http.delete(urlsave, $scope.person).success(function(data){
				// $scope.person = null; 
				$location.path('/');
			});
    };
  })

