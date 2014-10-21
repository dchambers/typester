var using = require('./lib/typester').using;
var topiarist = require('topiarist');

function typesterFunc(num1, num2) {
  using(arguments)
    .verify('num1').isA(Number)
    .verify('num2').isA(Number);

  return num1 + num2;
}

function manualFunc(num1, num2) {
  if(num1 === undefined) throw new ArgumentError('num1 argument must be provided.');
  if(!topiarist.isA(num1, Number)) throw new TypeError('num1 argument must be a Number.');
  if(num2 === undefined) throw new ArgumentError('num2 argument must be provided.');
  if(!topiarist.isA(num2, Number)) throw new TypeError('num2 argument must be a Number.');

  return num1 + num2;
}

function speedTest(funcName, func) {
  var startTime = Date.now();

  for(var i = 0; i < 100000; ++i) {
    func(i, i + 1);
  }

  var endTime = Date.now();
  console.log(funcName + ': ' + (endTime - startTime));
}

speedTest('typester', typesterFunc);
speedTest('manual', manualFunc);
speedTest('typester', typesterFunc);
speedTest('manual', manualFunc);
