
import * as BodyParser from "body-parser";
import * as Compression from "compression";
import * as Config from "config";
import {Application} from "express";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import {Configuration} from "../support/decorator/custom-decorator";
import {Logger} from "../util/logger";
import {BaseConfiguration} from "./base-configuration";

require('dotenv').config();



@Configuration()
export class ApplicationConfiguration implements BaseConfiguration {
    public configure(app: Application) {
        // server static content
       // app.use("/static", express.static(path.resolve(process.env.FILE_UPLOAD_PATH)));
        // express configurations
        app.use(BodyParser.urlencoded({
            extended: true,
        }));
        app.use(BodyParser.json({
            // reference -> https://www.npmjs.com/package/body-parser#limit
            limit: process.env.MAX_REQUEST_SIZE,
        }));
        // compression configs
        app.use(Compression({
            filter: (req, res) => {
                if (req.headers["x-no-compression"]) {
                    // don't compress responses with this request header
                    return false;
                }
                // fallback to standard filter function
                return Compression.filter(req, res);
            },
        }));
        // morgan logger for http requests added to log file
        app.use(morgan("tiny", {
            stream: {
                write: (meta: any) => {
                    // Logger.getLogger().info(meta);
                  //  console.log("Remove logs :D ")
                },
            },
        }));



    }
}
