var mainApp = angular.module('mainApp',['ngRoute']);
mainApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/',{
        templateUrl:'tpls/Login.html',
        controller:'mainCtrl'
    });

    $routeProvider.when('/user/management',{
        templateUrl:'tpls/Main.html',
        controller:'userCtrl'
    });

    $routeProvider.when('/test',{
        templateUrl:'tpls/Login.html'
    });


}]);

mainApp.controller('mainCtrl',['$http','$rootScope','$scope','$location',function($http, $rootScope, $scope, $location)
    {

        $scope.logged=false;
        $scope.doLogin=function () {

            var logUser={
                login:$scope.login,
                password:$scope.password
            };
            var req = {
                method: 'POST',
                url: '/login',
                headers: {'Content-Type': 'application/json'},
                data: logUser

            };
            $http(req).then(function (response) {


                if (response.statusCode=200){
                    $rootScope.token = response.data.token;
                    $rootScope.logged = true;
                    $rootScope.email = logUser.password;
                    $scope.logged = true;
                    $location.path("/user/management");
                }

                }
            ),function (response) {
                $rootScope.logged=false;
                $scope.logged=false;

            }
        }


    }]);