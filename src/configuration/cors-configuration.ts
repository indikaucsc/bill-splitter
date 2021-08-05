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

import * as cors from "cors";
import {Application} from "express";
import {Configuration} from "../support/decorator/custom-decorator";
import {BaseConfiguration} from "./base-configuration";

/**
 * Name: CorsConfiguration
 * Description: This is for the Cors configuration, Cross origin configuration is done here.
 * Date: 9/01/2019
 */
@Configuration()
export class CorsConfiguration implements BaseConfiguration {
    public configure(app: Application) {
        // allow options pre-flight request with CORS
        app.options("*", cors());
        app.use(cors());
    }
}
