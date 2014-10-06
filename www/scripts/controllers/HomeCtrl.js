angular.module('timeIsMoney')
    .controller('HomeCtrl', function($scope, $rootScope, $q, $ionicModal, $state, $interval) {

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('../www/templates/settings.html', function($ionicModal) {
    //    $ionicModal.fromTemplateUrl('../templates/settings.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    var stop;
    var delta = 0;
    var people;

    $scope.people = 2;
    $scope.averageRetribution = 400;
    $scope.Counting = false;
    $scope.time = 0;
    $scope.cycle = "28800000";
    $scope.cycleValue = 28800000; // hourly rate by default 3600000 milliseconds and hour.
    $scope.currency = "€";

    $scope.currencyValues = [
        { text: "$", value: "$" },
        { text: "€", value: "€" },
        { text: "£", value: "£" },
        { text: "元", value: "元" }
    ];
    $scope.cycleValues = [
        { text: "Hour", value: "3600000" },
        { text: "Day", value: "28800000" },
        { text: "Month", value: "576000000" },
        { text: "Year", value: "6912000000" }
    ];

    $scope.start = function () {
        if ( angular.isDefined(stop) ) return;

        people = $scope.people;
        $scope.Counting = true;

        stop = $interval(function() {
            people = $scope.people;
            //People * Avergae salary * DeltaIncerement (Time fraction)
            delta = delta + ((people * $scope.averageRetribution) / $scope.cycleValue);

            $scope.time = delta.toString().substring(0,5);
        }, 1);
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

        $scope.time = 0;
        delta = 1;
        people = $scope.people;
    };

    $scope.currencyChange = function(item) {
        $scope.currency = item.value;
    };

    $scope.cycleChange = function(item) {
        $scope.cycle = item.text;
        $scope.cycleValue = item.value;
    };

    // Modal functions

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

});
