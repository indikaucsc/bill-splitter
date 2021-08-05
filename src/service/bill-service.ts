import { BillRequest} from "../dto/bill-request";
import {BillResponse} from "../dto/bill-response";


export interface BillService {

    calculateSpilit(billRequest: BillRequest ): Promise<BillResponse>;

}