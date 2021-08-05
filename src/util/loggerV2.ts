import moment = require("moment");
import * as Bunyan from "bunyan";
import * as Config from "config";
import { isEmpty } from "lodash";
var fs = require('fs');
require('dotenv').config();
const RotatingFileStream = require('bunyan-rotating-file-stream');

export class LoggerV2 {



    public static getLogger() {

        if (!fs.existsSync(process.env.LOG_PATH + 'V2/' )) {
            fs.mkdirSync(process.env.LOG_PATH + 'V2/');
        }

       if (!this.bunyanLogger) {


            this.bunyanLogger =  Bunyan.createLogger({

                txnId:1,
                payload:2,
                event:3,
                name: "lucky1-log-v2",
                v:2,
                src : true,
                env: process.env.NODE_ENV,
                namespace: process.env.APP_NAME,
                thread: "",
                logger: {
                    "path": process.env.LOG_PATH

                },


                streams: [




                    {
                        type: 'rotating-file',
                        count: 3 ,       // keep 3 back copies
                        period: '1d',
                       // gzip: true,
                        path: process.env.LOG_PATH + 'V2/'  +process.env.LOGS_FILE_PREFIX+ "-" + moment().format("YYYY-MM-DD") + '.log'
                    },
                    {
                        level: 'info',
                        stream: process.stdout            // log INFO and above to stdout
                    }
                    //,
                    // {
                    //
                    //     stream: process.stdout            // log INFO and above to stdout
                    // }
                    // ,
                    // {
                    //     level: 'error',
                    //     period: '1h',
                    //   //  gzip: true,
                    //     path: process.env.LOG_PATH  + moment().format("YYYY-MM-DD-HH") + '_error.log' // log ERROR to  file
                    // },
                ]
            });
       }

        return this.bunyanLogger;
    }




    private static bunyanLogger = null;


}



///////////////////////////////////////////////////





//.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// call for log function
// logger.error({payload: {error}, msg: log_msg});