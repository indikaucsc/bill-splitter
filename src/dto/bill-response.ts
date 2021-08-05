import { IsNotEmpty } from "class-validator";

export class BillResponse {
    
    @IsNotEmpty()
    total_number_of_days: number = null;
    total_amount: number = null;
    how_much_spint = [];
    user_owes = [];
    settlements = [];
}