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

import {AbstractProblem} from "./abstract-problem";
import ErrorCode from "./error-code";
import {isObject} from "lodash";

/**
 * Name: ValidationProblem
 * Description: This problem will be thrown when user form validation got failed.
 * Date: 9/01/2019
 */
export class ValidationProblem extends AbstractProblem {
    constructor(statusCode: number, customErrorCode: string, description: string);
    constructor(statusCode: number, errorObj: ErrorCode);
    constructor(statusCode: number, errorObjOrCustomErrorCode: string | ErrorCode, description ?: string) {
        if (isObject(errorObjOrCustomErrorCode)) {
            super(statusCode, errorObjOrCustomErrorCode.CODE, errorObjOrCustomErrorCode.DESCRIPTION);
        } else {
            super(statusCode, errorObjOrCustomErrorCode, description);
        }
    }
}

