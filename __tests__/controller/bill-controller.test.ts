import "reflect-metadata";
import {BillController} from "../../src/controller/bill-controller";
import {BillServiceImpl} from "../../src/service/bill-service-impl";
import {BillRequest} from "../../src/dto/bill-request";
import {Bill} from "../../src/dto/bill";
import {BillResponse} from "../../src/dto/bill-response";
import {ValidationProblem} from "../../src/problem/validation-problem";
import httpStatus = require("http-status");
import {ERROR_CODES} from "../../src/constant/error-codes-constant";

const httpMocks = require("node-mocks-http");

describe('Test BillController',() =>{

    let billServiceImpl : BillServiceImpl = new BillServiceImpl();
    let billController: BillController = new BillController(billServiceImpl);

    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    afterEach(() =>{
        jest.resetAllMocks();
    });

        const billRequest : BillRequest = new BillRequest();
        const data1: Bill = new Bill();
        data1.amount=100;
        data1.day=1;
        data1.paid_by="kamal";
        data1.friends=["kamal", "nimal"];


        const data2: Bill = new Bill();
        data2.amount=200;
        data2.day=2;
        data2.paid_by="nimal";
        data2.friends=["kamal", "nimal", "piyal"];
        const data: Bill[] = [data1, data2];
        billRequest.data=data;




    test('CalculateBillSpilit method should work properly',async() => {

        const billResponse: BillResponse = new BillResponse();
        billResponse.total_number_of_days = 1;
        billResponse.total_amount = 1;
        billResponse.how_much_spint = [{
            "name": "sadun",
            "value": 240
        }];
        billResponse.user_owes = [{

                "name": "kamal-->sadun",
                "value": 160

        }];
        billResponse.settlements = [{
            "name": "sadun-->nimal",
            "value": 40
        }];

        jest.spyOn(billServiceImpl, "calculateSpilit").mockResolvedValue(billResponse);
        const response = await billController.CalculateBillSpilit(req);
        expect(response).toBe(billResponse);
    });





    test('CalculateBillSpilit method should throw invalid paid_by error',async() => {
        const billRequest : BillRequest = new BillRequest();
        const data1: Bill = new Bill();
        data1.amount=100;
        data1.day=1;
        data1.friends=["kamal", "nimal"];
        const data: Bill[] = [data1];
        billRequest.data=data;

        const errorResponse = new ValidationProblem(httpStatus.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR.CODE, "Invalid Parameter : Parameter 'paid_by' value cannot be null");

        await billController.CalculateBillSpilit(billRequest).catch((error) =>{
            expect(error.message).toBe(errorResponse.message);
        });
    });


    test('CalculateBillSpilit method should throw invalid amount error',async() => {
        const billRequest : BillRequest = new BillRequest();
        const data1: Bill = new Bill();
        data1.paid_by="kamal"
        data1.day=1;
        data1.friends=["kamal", "nimal"];
        const data: Bill[] = [data1];
        billRequest.data=data;

        const errorResponse = new ValidationProblem(httpStatus.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR.CODE, "Invalid Parameter : Parameter 'amount' value cannot be null");

        await billController.CalculateBillSpilit(billRequest).catch((error) =>{
            expect(error.message).toBe(errorResponse.message);
        });
    });






});
