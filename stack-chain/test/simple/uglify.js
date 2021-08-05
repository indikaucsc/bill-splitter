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
var uglify = require("uglify-js");
var path = require("path");

test("can be uglified", function (t) {
  var files = ['format.js', 'index.js', 'stack-chain.js'].map(function (filename) {
    return path.resolve(__dirname, '../../' + filename);
  });
  uglify.minify(files);
  t.end()
});
