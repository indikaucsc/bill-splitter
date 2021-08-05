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

import {Response} from "express";
import {CustomError} from "ts-custom-error";
import {ProblemHandler} from "../support/decorator/custom-decorator";
import {AbstractProblem} from "./abstract-problem";

/**
 * Name: ProblemTranslator
 * Description: This is the centralized place where thrown exceptions(problems) are catched.
 *              Once problem object come here set the problem object to the HTTP response and return to the presentation
 *              layer as follows.
 *              Eg: {statusCode:401, customErrorCode:'ERR_0001', description:'Not enough permission for user module'}
 * Date: 9/01/2019
 */
@ProblemHandler()
export class ProblemTranslator {

    public process(error: Error, response: Response): void {

        let errorResponse = {};
        let statusCode = 500;
        if (!(error instanceof CustomError)) {
            errorResponse = {
                statusCode: 500,
                name: error.name,
                customErrorCode: "Application Logical Error",
                description: error.message,
            };
        } else {
            errorResponse = error;
            const customError: AbstractProblem = error as AbstractProblem;
            statusCode = customError.getStatusCode();
        }

        response.status(statusCode).send(errorResponse);
    }

}
