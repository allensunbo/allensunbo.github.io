onmessage = function(e) {
  console.log(e.data);
  var data = JSON.parse(e.data);
  solve(data);
};


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


function solve(data) {

  var DATA = data.DATA,
    TARGET_SUM = data.TARGET_SUM;
  // console.log(DATA, TARGET_SUM);

  var stack = [];
  var sumInStack = 0;

  populateSubset(DATA, 0, DATA.length);


  function populateSubset(data, fromIndex, endIndex) {
    if (sumInStack === TARGET_SUM) {
      print(stack);
    }
    console.log('processing ' + fromIndex);
    for (var currentIndex = fromIndex; currentIndex < endIndex; currentIndex++) {

      if (sumInStack + data[currentIndex] <= TARGET_SUM) {
        stack.push(data[currentIndex]);
        sumInStack += data[currentIndex];
        populateSubset(data, currentIndex + 1, endIndex);
        sumInStack -= stack.pop();
      }
    }
  }

  function print(stack) {
    var s = '';
    s = '$' + (TARGET_SUM / 100).toFixed(2) + " = ";
    // console.log(stack);
    stack.forEach(function(v) {
      s += ('$' + (v / 100).toFixed(2) + " + ");
    });
    s = s.trim();
    console.log(s.slice(0, s.length - 1));
    //document.write('<div>' + s.slice(0, s.length - 1) + '</div>');
    //document.write('<div>' + s.slice(0, s.length - 1) + '</div>');
    // $scope.results.push(s.slice(0, s.length - 1));
    postMessage(s.slice(0, s.length - 1));
  }
}
