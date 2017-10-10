angular.module('app.routes', ['ngRoute'])
// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/app/views/pages/home.html',
            controller : 'homeCtrl',
            controllerAs : 'home'
        });

    $locationProvider.html5Mode(true);
});
