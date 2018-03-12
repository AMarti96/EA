(function() {
    'use strict';
    var app = angular.module('myApp',[]);
    app.controller('userCtrl', ['userSRV','$scope', function (userSRV,$scope) {


        var base=bigInt(2);
        var p2=bigInt.zero;
        var q2=bigInt.zero;
        var e2= bigInt.zero;
        var prime=false;

        while(!prime){
            p2=bigInt.randBetween(base.pow(511),base.pow(512).subtract(1));
            prime=bigInt(p2).isPrime()

        }
        prime=false;
        while(!prime){
            q2=bigInt.randBetween(base.pow(511),base.pow(512).subtract(1));
            prime=bigInt(q2).isPrime()
        }
        prime = false;
        while(!prime){
            e2=bigInt.randBetween(base.pow(255),base.pow(256).subtract(1));
            prime = bigInt(e2).isPrime();
        }
        var fin2=p2.subtract(1).multiply(q2.subtract(1));
        var n2=p2.multiply(q2);
        var d2=e2.modInv(fin2);

        var comp2 = (d2.multiply(e2)).mod(fin2);

        console.log("Comprobacion: "+comp2);


        var msgStr="Hola2";
        var msgBuf=Buffer.from(msgStr,'utf8');
        var msgBi= bigInt(msgBuf.toString('hex'),16);
        var msgEnc=msgBi.modPow(e2,n2);
        var msgDec=msgEnc.modPow(d2,n2);
        var msgDecBuf=Buffer.from(msgDec.toString(16),'hex');
        console.log(msgDecBuf.toString('utf-8'));

        $scope.users = [];

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
            userSRV.filterdb($scope.filterDB,function (users) {

                $scope.users = users;
                $scope.userName = "";
                $scope.userPass = "";
                $scope.filterDB="";

            })

        };
        $scope.showList = function() {
            userSRV.getUsers(function (users) {
                $scope.users = users;
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
        $scope.remove = function() {

            var data = {
                name: $scope.userName,
                password:$scope.userPass
            };

            userSRV.removeUser(data,function (list) {
                $scope.userName = "";
                $scope.userPass = "";
                $scope.users = list;

            });


        };
        $scope.removeList = function () {

            var deltedUsers = [];
            angular.forEach($scope.users,function (user) {
                if(user.done){deltedUsers.push(user.name);}
            });
            userSRV.removeUsers(deltedUsers,function (list) {
                $scope.users = list;
            });

        };
    }]);
})();