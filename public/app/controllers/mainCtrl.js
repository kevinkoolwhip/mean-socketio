angular.module('mainCtrl', ['socketIO'])

	.controller('homeCtrl',['$scope', 'socket', function($scope, socket ){

		socket.on('data', function(data){
			$scope.myData = data;
		});

	}]);




