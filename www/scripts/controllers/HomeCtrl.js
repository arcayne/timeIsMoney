angular.module('timeIsMoney')
    .controller('HomeCtrl',                 
        function($scope, $rootScope, $q, $ionicModal, $state, $interval) {
      // Load the modal from the given template URL
      $ionicModal.fromTemplateUrl('../www/templates/settings.html', function($ionicModal) {
      //$ionicModal.fromTemplateUrl('../templates/settings.html', function($ionicModal) {
            $scope.modal = $ionicModal;
        }, 
        {
            // Use our scope for the scope of the modal to keep it simple
            scope: $scope, //dataModal
            // The animation we want to use for the modal entrance
            animation: 'slide-in-up'
        });
    
    $scope.popo = {
        averageRetribution: 600
    };

    var stop;
    var delta = 0;
    var deltaToAdd = 0;

    $scope.people = 2;

    $scope.Counting = false;
    $scope.time = 0;
    $scope.cycle = "2880000";
    $scope.cycleValue = 2880000; // hourly rate by default 3600000 milliseconds and hour.
    $scope.currency = "€";

    $scope.currencyValues = [
        { text: "$", value: "$" },
        { text: "€", value: "€" },
        { text: "£", value: "£" },
        { text: "元", value: "元" }
    ];
    $scope.cycleValues = [
        { text: "Hour", value: "360000" },
        { text: "Day", value: "2880000" },
        { text: "Month", value: "57600000" },
        { text: "Year", value: "691200000" }
    ];

    $scope.$watch($scope.people, function (value) {
        //Calculate new delta to add
        deltaToAdd = ($scope.people * $scope.popo.averageRetribution) / $scope.cycleValue;

    }, true);

    $scope.$watch($scope.popo.averageRetribution, function (value) {
        //Calculate new delta to add
        deltaToAdd = ($scope.people * $scope.popo.averageRetribution) / $scope.cycleValue;

    }, true);

    $scope.$watch($scope.cycleValue, function (value) {
        //Calculate new delta to add
        deltaToAdd = ($scope.people * $scope.popo.averageRetribution) / $scope.cycleValue;

    }, true);

    $scope.start = function () {
        if ( angular.isDefined(stop) ) return;

        $scope.Counting = true;

        stop = $interval(function() {
            //People * Average salary * DeltaIncrement (Time fraction)
            delta = delta + deltaToAdd;

            $scope.time = delta.toString().substring(0,5);
        }, 10);
    };

    $scope.pause = function () {

        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
            $scope.Counting = false;
        }
    };

    $scope.reset = function () {

        $scope.time = 0;
        delta = 0;
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
    $scope.$on('modal.hidden', function(data) {
        
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
});
