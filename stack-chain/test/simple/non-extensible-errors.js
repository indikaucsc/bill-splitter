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
var chain = require('../../');

test("non extensible Error objects don't throw", function(t) {
  var error = new Error("don't extend me");
  Object.preventExtensions(error)
  t.doesNotThrow(function() {
    error.stack;
  });
  t.end();
});

test('stack is correct on non extensible error object', function (t) {
  var error = new Error("don't extend me");
  Object.preventExtensions(error);

  chain.format.replace(function () {
    return 'good';
  });

  try {
    t.equal(error.stack, 'good');
  } catch (e) { t.ifError(e); }

  chain.format.restore();

  t.end();
});

