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


var chain = require('./stack-chain.js');
var summary = require('summary');
var assert = require('assert');

function timeit(top, doit) {
    var times = new Float64Array(top);
    var total = 0;

    for (var i = 0; i < top; i++) {
        var tick = process.hrtime();
        total += doit().length;
        var tock = process.hrtime(tick);
        times[i] = tock[0] * 1e9 + tock[1];
    }

    assert(total, top * doit().length);
    return summary(times);
}

({
    'master': function () {
        var fork = require('child_process').fork;

        function bench(name, callback) {
            var cp = fork(__filename, [name]);
            cp.once('message', function (stat) {
                console.log(name + ': ' + stat.mean.toFixed(4) + ' ± ' + (1.96 * stat.sd).toFixed(4) + ' ns/tick');
            });
            cp.once('close', callback);
        }

        bench('propery', function () {
            bench('method', function () {
                console.log('done');
            });
        });
    },

    'propery': function () {
        var top = 10000;
        var stat = timeit(top, function () {
            return (new Error()).callSite.original;
        });
        process.send({ "mean": stat.mean(), "sd": stat.sd() });
    },

    'method': function () {
        var top = 100000;
        var stat = timeit(top, function () {
            return chain.callSite();
        });
        process.send({ "mean": stat.mean(), "sd": stat.sd() });
    }
})[process.argv[2] || 'master']();
