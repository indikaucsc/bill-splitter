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

import * as Config from "config";
import * as express from "express";
import {Application} from "express";
import * as swagger from "swagger-express-ts";
import {SwaggerDefinitionConstant} from "swagger-express-ts";
import {Configuration} from "../support/decorator/custom-decorator";
import {BaseConfiguration} from "./base-configuration";

/**
 * Name: SwaggerConfiguration
 * Description: Swagger configuration is done here.
 * Date: 9/01/2019
 */
@Configuration()
export class SwaggerConfiguration implements BaseConfiguration {
    public configure(app: Application) {
        app.use("/api-docs/swagger", express.static("swagger"));
        app.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
        app.use(swagger.express({
            definition: {
                info: {
                    title: process.env.APP_NAME,
                    version: process.env.APP_VERSION,
                },
                securityDefinitions: {
                    authorization: {
                        type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                        in: SwaggerDefinitionConstant.Security.In.HEADER,
                        name: "authorization",
                    },
                },
            },
        }));
    }
}
