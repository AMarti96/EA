(function() {
    'use strict';
    var app = angular.module('mainApp');
    app.service('userSRV', ['$http',function ($http) {

        this.pushSb = function (newSb, callback) {
            var req = {
                method: 'POST',
                url: '/newSb',
                headers: {'Content-Type': 'application/json'},
                data: newSb

            };
            $http(req).then(function () {
                $http.get('/allsubjects').then(function (response) {
                    callback (response.data);
                });
            });

        };
        this.pushUser = function (newUser, callback) {
            var req = {
                method: 'POST',
                url: '/push',
                headers: {'Content-Type': 'application/json'},
                data: newUser

            };
            $http(req).then(function () {
                $http.get('/all').then(function (response) {
                    callback (response.data);

                });
            });
        };
        this.getUsers = function (callback) {

            $http.get('/all').then(function (response) {
                callback (response.data);
            });

        };
        this.getSubjects = function (callback) {

            $http.get('/allsubjects').then(function (response) {
                callback (response.data);
            });

        };
        this.getSubjectsName = function (callback) {

            $http.get('/allsubjects').then(function (response) {
                callback (response.data);
            });

        };
        this.removeUsers = function (data,callback) {
            var req = {
                method: 'DELETE',
                url: '/delete',
                headers: {'Content-Type': 'application/json'},
                data: data
            };
            $http(req).then(function (response) {

                callback(response.data)

            });
        };
        this.filterdb =function (data,callback) {

            var req = {
                method: 'GET',
                data: data,
                url: '/filterdb/'+data,
                headers: {'Content-Type': 'application/json'}

            };

             $http(req).then(function (response) {

              callback(response.data)

             });
        };
        this.studentDetail = function (data,callback) {

            var req = {
                method: 'POST',
                url: '/studet',
                headers: {'Content-Type': 'application/json'},
                data: data

            };
            $http(req).then(function (response) {
                callback(response.data)
            });

        };
        this.updateUser=function(data,callback){
            var req = {
                method: 'PUT',
                url: '/update',
                headers: {'Content-Type': 'application/json'},
                data: data
            };
            $http(req).then(function (response) {
                callback(response.data)
            });
        }
        this.getSubUser= function (data, callback) {
            var req = {
                method: 'POST',
                url: '/getonesub',
                headers: {'Content-Type': 'application/json'},
                data: data

            };
            $http(req).then(function (response) {
                callback(response.data)
            });
        };
        this.getTitUser= function (data, callback) {
            var req = {
                method: 'POST',
                url: '/getonetit',
                headers: {'Content-Type': 'application/json'},
                data: data

            };
            $http(req).then(function (response) {
                callback(response.data)
            });
        };
        this.getSubDetail= function (data, callback) {
            var req = {
                method: 'POST',
                url: '/getdetailsub',
                headers: {'Content-Type': 'application/json'},
                data: data

            };
            $http(req).then(function (response) {
                callback(response.data)
            });
        };
        this.updateSubject=function(data,callback){
            var req = {
                method: 'PUT',
                url: '/updsub',
                headers: {'Content-Type': 'application/json'},
                data: data
            };
            $http(req).then(function (response) {
                callback(response.data)
            });
        }
    }]);
})();