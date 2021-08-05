import {ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, ValidateNested} from "class-validator";
import {Bill} from "./bill";
import {Type} from "class-transformer";


export class BillRequest {
    
    // @IsNotEmpty()
    // data: Bill[] = [];


    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    // @ArrayMaxSize(2)
    @Type(() => Bill)
    data: Bill[];

    // @IsNotEmpty()
    // amount: string = null;
    //
    // @IsNotEmpty()
    // paid_by: string = null;
    //
    // @IsNotEmpty()
    // friends : string[] = null;

}