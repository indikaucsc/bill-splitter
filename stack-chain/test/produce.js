/*
 *  DIGITALX LABS(PVT)LTD PROPRIETARY AND CONFIDENTIAL INFORMATION SUBJECT TO NDA
 * 
 *  Copyright © 2019. DIGITALX LABS(PVT)LTD
 *  All Rights Reserved.
 * 
 *  NOTICE:  All information contained herein is, and remains
 *  the property of DIGITALX LABS(PVT)LTD.  The intellectual and technical concepts contained
 *  herein are proprietary to DIGITALX LABS(PVT)LTD.
 *  Dissemination of this information, reproduction of this material, and copying or distribution of this software
 *  is strictly forbidden unless prior written permission is obtained from DIGITALX LABS(PVT)LTD.
 */


// Produces an error with `level` deept in the call stack
exports.deepStack = function deepStack(curr, top, callback) {
  if (curr === top) {
    callback();
  } else {
    deepStack(curr + 1, top, callback);
  }
};

exports.real = function produceError(level) {
  var stack;
  var limit = Error.stackTraceLimit;

  exports.deepStack(0, level, function () {
    Error.stackTraceLimit = level;

    var error = new Error('trace');
        error.test = true;
    stack = error.stack;

    Error.stackTraceLimit = limit;
  });

  return stack || 'Error: trace';
};

exports.fake = function(input) {
  var output = [];

  for (var i = 0, l = input.length; i < l; i++) {
    output.push(input[i].replace('{where}', module.filename));
  }

  return output.join('\n');
};

exports.convert = function (callSites) {
  var lines = [];
  for (var i = 0; i < callSites.length; i++) {
    lines.push("    at " + callSites[i].toString());
  }
  return lines.join('\n');
};
