import { IsNotEmpty } from "class-validator";

export class Bill {
    
    @IsNotEmpty()
    day: number = null;

    @IsNotEmpty()
    amount: number = null;

    @IsNotEmpty()
    paid_by: string = null;

    @IsNotEmpty()
    friends : string[] = null;

}