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


var test = require("tap").test;
var defaultFormater = require('../../format.js');
var produce = require('../produce.js');

var chain = require('../../');

// Set a formater after stack-chain is required
function prepareStackTrace(error, frames) {
  if (error.test) {
    var lines = [];
        lines.push(error.toString());

    for (var i = 0, l = frames.length; i < l; i++) {
        lines.push(frames[i].getFunctionName());
    }

    return lines.join("\n");
  }

  return defaultFormater(error, frames);
}

test("set Error.prepareStackTrace after require", function (t) {
  t.test("set prepareStackTrace", function (t) {
    Error.prepareStackTrace = prepareStackTrace;
    t.end();
  });

  t.test("default formatter replaced", function (t) {
    t.equal(produce.real(3), produce.fake([
      'Error: trace',
      '',
      'deepStack',
      'deepStack'
    ]));

    t.end();
  });

  t.test("restore default formater", function (t) {
    chain.format.restore();

    t.equal(produce.real(3), produce.fake([
      'Error: trace',
      '    at {where}:18:17',
      '    at deepStack ({where}:5:5)',
      '    at deepStack ({where}:7:5)'
    ]));

    t.end();
  });

  t.end();
});

test("set Error.prepareStackTrace after require to undefined", function (t) {
  t.test("set prepareStackTrace", function (t) {
    Error.prepareStackTrace = prepareStackTrace;
    t.end();
  });

  t.test("default formatter replaced", function (t) {
    t.equal(produce.real(3), produce.fake([
      'Error: trace',
      '',
      'deepStack',
      'deepStack'
    ]));

    t.end();
  });

  t.test("restore default formater", function (t) {
    Error.prepareStackTrace = undefined;

    t.equal(produce.real(3), produce.fake([
      'Error: trace',
      '    at {where}:18:17',
      '    at deepStack ({where}:5:5)',
      '    at deepStack ({where}:7:5)'
    ]));

    t.end();
  });

  t.end();
});

test("set Error.prepareStackTrace after require to itself", function (t) {
  t.test("default formatter replaced", function (t) {
    var old = Error.prepareStackTrace;

    Error.prepareStackTrace = function () {
      return 'custom';
    };
    t.equal(new Error().stack, 'custom');

    Error.prepareStackTrace = old;

    t.equal(produce.real(3), produce.fake([
      'Error: trace',
      '    at {where}:18:17',
      '    at deepStack ({where}:5:5)',
      '    at deepStack ({where}:7:5)'
    ]));

    t.end();
  });

  t.end();
});
