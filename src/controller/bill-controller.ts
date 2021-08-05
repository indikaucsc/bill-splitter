import {BaseHttpController, httpPost as HttpPost, requestBody,} from "inversify-express-utils"
import {RestController} from '../support/decorator/custom-decorator';
import {inject as Inject} from "inversify";
import {TYPES} from "../constant/common-constant";
import {ValidationProblem} from "../problem/validation-problem";
import * as httpStatus from "http-status";
import {ERROR_CODES} from "../constant/error-codes-constant";
import {BillServiceImpl} from "../service/bill-service-impl";
import {BillRequest} from "../dto/bill-request";

const uuid = require('node-uuid');

const payloadChecker = require('payload-validator');

const expectedPayload = {
    "data": [{
        "day": 0,
        "amount": 0,
        "paid_by": "",
        "friends": []
    }
    ]
};

@RestController("/api/v1/bill")
export class BillController extends BaseHttpController {

    constructor(@Inject(TYPES.BillService) private billService: BillServiceImpl) {
        super();
    }

    @HttpPost("/settlements")
    public async CalculateBillSpilit(@requestBody() requestBody: any) {
        const result = payloadChecker.validator(requestBody, expectedPayload, ["day", "amount", "paid_by", "friends"], false);
        if (result.success) {
            const billRequest: BillRequest = requestBody;
            return await this.billService.calculateSpilit(billRequest);
        } else {
            throw new ValidationProblem(httpStatus.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR.CODE, "Invalid Parameter : " + result.response.errorMessage);
        }

    }

}