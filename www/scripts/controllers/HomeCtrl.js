angular.module('timeIsMoney').controller('HomeCtrl', function($scope, $rootScope, $q, $state,$interval) {

    var delta = $scope.time = 1;
    //var realTimeToAdd = $scope.time;
    var stop;
    $scope.Counting = false;
    var people;
    //var delta = 1;

    $scope.people = 2;

    $scope.start = function () {
        if ( angular.isDefined(stop) ) return;

        people = $scope.people;
        $scope.Counting = true;

        stop = $interval(function() {
            people = $scope.people;
            //People * Avergae salary * DeltaIncerement (Time fraction)
            delta = delta + (people * (75 / 3600000));

            $scope.time = delta.toString().substring(0,5);
        }, 10);
    };

    $scope.pause = function () {

        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
            $scope.Counting = false;
        }
        people = $scope.people;
    };

    $scope.reset = function () {

        delta = $scope.time = 1;
        people = $scope.people;
    };

});
