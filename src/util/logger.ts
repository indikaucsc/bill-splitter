import moment = require("moment");
import * as Bunyan from "bunyan";
import * as Config from "config";
import { isEmpty } from "lodash";
var fs = require('fs');
require('dotenv').config();
const RotatingFileStream = require('bunyan-rotating-file-stream');

export class Logger {



    public static getLogger() {

        if (!fs.existsSync(process.env.LOG_PATH )) {
            fs.mkdirSync(process.env.LOG_PATH );
        }

       if (!this.bunyanLogger) {


            this.bunyanLogger =  Bunyan.createLogger({
                time:  moment().format("YYYY-MM-DD HH:mm:ss.SSSS"),
                txnId:1,
                payload:2,
                event:3,
                name: "lucky1-log",
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

                        period: '1h',
                       // gzip: true,
                        path: process.env.LOG_PATH  + moment().format("YYYY-MM-DD-HH") + '.log'
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

    public static infoLogger(txnId: string, payload?: any) {
        Logger.getLogger().info({txnId:txnId , payload :payload });
        //console.log(logger, msg);
    }

    public static errorLogger(txnId: string, payload?: any) {
        // let msg: string = "";
        // if (!isEmpty(ob)) {
        //     msg = JSON.stringify(ob);
        // }
        Logger.getLogger().error({txnId:txnId , payload :payload });
        // console.log(logger, msg);
    }
}



///////////////////////////////////////////////////





//.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// call for log function
// logger.error({payload: {error}, msg: log_msg});