import {ApiModel, ApiModelProperty} from "swagger-express-ts";
import {CustomError} from "ts-custom-error";


@ApiModel({
    description: "Problem",
    name: "Problem",
})
export abstract class AbstractProblem extends CustomError {
    @ApiModelProperty({description: "Status Code"})
    private readonly statusCode: number = 500;

    @ApiModelProperty({description: "Custom Error Code"})
    private customErrorCode: string = "";

    @ApiModelProperty({description: "Description"})
    private description: string = "";

    @ApiModelProperty({description: "Data"})
    private data: any;

    protected constructor(statusCode: number, customErrorCode: string, description: string, data?: any) {
        super(description);
        this.statusCode = statusCode;
        this.customErrorCode = customErrorCode;
        this.description = description;
        this.data = data;
    }

    public getStatusCode(): number {
        return this.statusCode;
    }
}
