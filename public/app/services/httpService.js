/**
 * Created by work on 10/13/17.
 */


angular.module('httpService', [])
    .factory('httpService', function ($http) {

    var httpFactory = {};

    httpFactory.get = function(){
        return $http.get('api/me');
    };

    return httpFactory;
});