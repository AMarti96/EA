(function() {
    'use strict';
    var app = angular.module('mainApp');
    app.controller('userCtrl', ['userSRV','$scope', function (userSRV,$scope) {

        $scope.users = [];
        $scope.students = [];
        $scope.subjectsdb = [];
        $scope.subjectsdb2 = [];
        $scope.subjectsname=[];


        angular.element(document).ready(function () {
            userSRV.getSubjectsName(function (subjects) {
                $scope.subjectsname = subjects;

            });
        });
        $scope.addsub = function () {
            var newsub = {
                name: $scope.sbName,
                when: $scope.sbPeriod
            };
            userSRV.pushSb(newsub,function (sb) {
                $scope.sbName = "";
                $scope.sbPeriod="";
                $scope.subjectsname = sb;
            });
            location.reload();
        };
        $scope.userAdd = function(){
            var newUser = {
            name: $scope.userName,
            password: $scope.userPass
        };
        userSRV.pushUser(newUser,function (users) {
            $scope.userName = "";
            $scope.userPass = "";
            $scope.users = users;
        });
            };
        $scope.filterdb=function(){
            userSRV.filterdb($scope.filterDB,function (students) {

                $scope.students = students;
                $scope.filterDB="";
            })
        };

        $scope.getsub=function(){

             var data={
                 name:$scope.subjectName.split(" ")[1]
             };
            userSRV.getSubUser(data,function (users) {
              $scope.users = users;

            })
        };
        $scope.gettit=function(){
            var data={
                name:$scope.titulName
            };
            userSRV.getTitUser(data,function (users) {
                $scope.students = users;
            });
            $scope.titulName = "";
        };
        $scope.detailsub=function(){

            var data={
                name:$scope.subjectName.split(" ")[1]
            };
            userSRV.getSubDetail(data,function (subj) {
                $scope.subjectsdb2 = subj;

            })
        };
        $scope.showList = function() {
            userSRV.getUsers(function (users) {
                $scope.students=[];
                $scope.users = users;
            });
        };
        $scope.studentDetail = function () {
            var data={
                name: $scope.stuName
            };
            userSRV.studentDetail(data,function (student) {
                $scope.student = student;
                $scope.stuName = "";
            });

        };
        $scope.showSubjects = function() {
            userSRV.getSubjects(function (subjects) {
                $scope.subjectsdb = subjects;
            });
        };
        $scope.update=function(){
            var data = {
                name: $scope.userName,
                password:$scope.userPass,
                new:$scope.newPass
            };
            $scope.newPass="";
            $scope.userName = "";
            $scope.userPass = "";
            userSRV.updateUser(data,function (list) {
                $scope.users=list
            });
        };
        $scope.updatesub=function(){
            var data = {
                name: $scope.userName2,
                subject: $scope.subjectName.split(" ")[1]
            };
            $scope.userName = "";
            userSRV.updateSubject(data,function (list) {
            });
            $scope.userName2="";
            $scope.subjectName="";

        };
        $scope.remove = function() {
            var data = {
                name: $scope.userName,
                password:$scope.userPass
            };

            userSRV.removeUsers(data,function (list) {
                $scope.userName = "";
                $scope.userPass = "";
                $scope.users = list;

            });


            /*
            var deltedUsers = [];
            angular.forEach($scope.users,function (user) {
                if(user.done){deltedUsers.push(user.name);}
            });
            userSRV.removeUsers(deltedUsers,function (list) {
                $scope.users = list;
            });
            */

        };
    }]);
})();