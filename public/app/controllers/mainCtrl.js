angular.module('mainCtrl', ['socketIO' ,'httpService',  'ui.grid.resizeColumns', 'ui.grid.moveColumns'])

	.controller('homeCtrl',['$scope', '$filter','socket','httpService',function($scope, $filter ,socket, httpService ){

		$scope.gridOptions = {};
		$scope.gridOptions.data = $scope.Data;

		socket.on('data', function(data){
			$scope.Data = data;
			$scope.gridOptions.data = data;
			filterSearch($scope.searchTerm);
		});

		httpService.get().success(function(data){
		 	console.log(data);
			$scope.gridOptions.data = data;
		 });

		$scope.refreshData = function (termObj) {
			$scope.gridOptions.data = $scope.Data;
			$scope.searchTerm = termObj;

			filterSearch(termObj);
		};


		$scope.gridOptions = {
			enableSorting: true,
			columnDefs: [
				{ field: 'name', minwidth: 200, width: 250, enableColumnResizing: true },
				{ field: 'namespace', width: '30%', maxWidth: 200, minwidth: 70},
				{ field: 'RepclicaCount'},
				{ field: 'ReadyReplicaCount'}]
		};

	function filterSearch(searchTerm){
		while (searchTerm) {
			var oSearchArray = searchTerm.split(' ');
			$scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, oSearchArray[0], undefined);
			oSearchArray.shift();
			searchTerm = (oSearchArray.length !== 0) ? oSearchArray.join(' ') : '';
		}
	}



	}]);




