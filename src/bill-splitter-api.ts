import "reflect-metadata";


import * as Cluster from "cluster";



import {NodeApplication} from "./support/decorator/custom-decorator";
import {Logger} from "./util/logger";
import {TimezoneHelper} from "./util/timezone-helper";

/**
 * Name: BillSplitterApi
 * Description: This is the application starting point.
 * Date: 9/01/2019
 */

@NodeApplication
export class BillSplitterApi {

    public run() {
        console.log(TimezoneHelper.loggerTime(new Date(Date.now())) + ` Server Started at ${process.env.APP_PORT}`);
        // Logger.getLogger().info(`Server Started at ${process.env.APP_PORT}`);
        Logger.getLogger().info({
            time: TimezoneHelper.loggerTime(new Date(Date.now())),
            event: `Server Started at ${process.env.APP_PORT}`
        });

    }


}



/**
 * Catch uncaughtException event
 */
process.on('uncaughtException', function (error) {
    console.log(error.stack);
    Logger.getLogger().info({
        time: TimezoneHelper.loggerTime(new Date(Date.now())),
        event: "Uncaught Exception ...",
        error: error.stack
    });
    Logger.getLogger().error({
        time: TimezoneHelper.loggerTime(new Date(Date.now())),
        event: "Uncaught Exception ...",
        error: error.stack
    });
});


/**
 * Catch Server Shutdown event
 */
process.on("SIGINT", async () => {
    Logger.getLogger().info({time: TimezoneHelper.loggerTime(new Date(Date.now())), event: "Shutting down ..."});
    Logger.getLogger().error({time: TimezoneHelper.loggerTime(new Date(Date.now())), event: "Shutting down ..."});
    // shutdown workers
    Cluster.emit("kill");
    // on success
    console.log(TimezoneHelper.loggerTime(new Date(Date.now())) + " Shutting down ..");
    process.exit(0);
});

