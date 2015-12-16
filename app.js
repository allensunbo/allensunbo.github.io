angular.module('app', ['firebase'])
    .controller('MainCtrl', function($scope, $firebaseObject) {
        // $scope.results = [];
        var url = 'https://sizzling-inferno-7092.firebaseio.com';
        var fireRef = new Firebase(url);
        $scope.wrapper = $firebaseObject(fireRef);
        $scope.submit = function() {
            $scope.results = [];
            $scope.wrapper.srcData = $scope.srcData;
            $scope.DATA = convert($scope.srcData);
            $scope.wrapper.DATA = $scope.DATA;
            $scope.TARGET_SUM = parseInt($scope.srcTarget.replace(/[\$\.,]/g, ''));
            $scope.wrapper.TARGET_SUM = $scope.TARGET_SUM;
            $scope.wrapper.$save();
            // $scope.TARGET_SUM = 277200 + 2089975;
            solve($scope);
        }

    });

function convert(srcData) {
    var dataStr = srcData.replace(/[\$\.,]/g, '').split('\n');
    var result = [];
    dataStr.forEach(function(v) {
        result.push(parseInt(v));
    });
    result.sort(function(a, b) {
        return a - b;
    });
    return result;
}


function solve($scope) {
    var DATA = $scope.DATA,
        TARGET_SUM = $scope.TARGET_SUM;
    console.log(DATA, TARGET_SUM);

    var stack = [];
    var sumInStack = 0;

    populateSubset($scope, DATA, 0, DATA.length);


    function populateSubset($scope, data, fromIndex, endIndex) {
        if (sumInStack === TARGET_SUM) {
            print($scope, stack);
        }

        for (var currentIndex = fromIndex; currentIndex < endIndex; currentIndex++) {

            if (sumInStack + data[currentIndex] <= TARGET_SUM) {
                stack.push(data[currentIndex]);
                sumInStack += data[currentIndex];
                populateSubset($scope, data, currentIndex + 1, endIndex);
                sumInStack -= stack.pop();
            }
        }
    }


    function print($scope, stack) {
        var s = '';
        s = '$' + (TARGET_SUM / 100).toFixed(2) + " = ";
        console.log(stack);
        stack.forEach(function(v) {
            s += ('$' + (v / 100).toFixed(2) + " + ");
        });
        s = s.trim();
        console.log(s.slice(0, s.length - 1));
        //document.write('<div>' + s.slice(0, s.length - 1) + '</div>');
        //document.write('<div>' + s.slice(0, s.length - 1) + '</div>');
        $scope.results.push(s.slice(0, s.length - 1));
    }
}
