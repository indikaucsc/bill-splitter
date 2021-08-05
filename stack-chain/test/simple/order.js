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
var produce = require('../produce.js');

test("modifier execution order", function (t) {
  var filter = function (error, frames) {
    if (error.test) {
      frames.splice(0, 1);
    }

    return frames;
  };

  var modify = function (error, frames) {
    if (error.test) {
      frames.splice(1, 0, "wonder land");
    }

    return frames;
  };

  chain.filter.attach(filter);
  chain.extend.attach(modify);
  chain.extend.attach(modify);

  t.equal(produce.real(4), produce.fake([
    'Error: trace',
    '    at wonder land',
    '    at wonder land',
    '    at deepStack ({where}:5:5)',
    '    at deepStack ({where}:7:5)'
  ]));

  chain.filter.deattach(filter);
  chain.extend.deattach(modify);
  chain.extend.deattach(modify);

  t.end();
});
