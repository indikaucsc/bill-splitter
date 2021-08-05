import {TYPES} from "../constant/common-constant";
import {Service} from "../support/decorator/custom-decorator";
import {BillService} from "./bill-service";
import {BillRequest} from "../dto/bill-request";
import {BillResponse} from "../dto/bill-response";
import {Bill} from "../dto/bill";

@Service(TYPES.BillService)
export class BillServiceImpl implements BillService {

    constructor() {
    }


    /**
     * Handle Token generation Process
     *
     * @param tokenRequest
     */
    public async calculateSpilit(billRequest: BillRequest): Promise<BillResponse> {


        const billList: Bill[] = billRequest.data;
        const billResponse: BillResponse = new BillResponse();
        let totalNumberOfDays: number = 0;
        let totalSpent: number = 0;
        const paidBill = new Map();
        const settlementsCombinationMap = new Map();
        const owesMap = new Map();


        for (let x = 0; x < billList.length; x++) {

            const paidBy : string = billList[x].paid_by;
            const amount : number = billList[x].amount;
            const friends = billList[x].friends;
            const todayPotion =Math.floor(amount / friends.length);


            //  Total number of days
            totalNumberOfDays = (billList[x].day > 0) ? totalNumberOfDays + 1 : totalNumberOfDays;

            //  Total amount spent by all friends
            totalSpent = (amount > 0) ? totalSpent + amount : totalSpent;


            //  How much each friend has spent. (If I bring someone outside of the circle, then it comes under my account )
            if (paidBy) {
                if (paidBill.has(paidBy)) {
                    paidBill.set(paidBy, (paidBill.get(paidBy) + amount));
                } else {
                    paidBill.set(paidBy, amount);
                }
            }



           // let single = new Map();
            for (let y = 0; y < friends.length; y++) {
                if (friends[y] !== paidBy) {
                    const key = friends[y] + "-->" + paidBy;
                    const oppositeKey = paidBy + "-->" + friends[y];
                    if (settlementsCombinationMap.has(key)) {
                        settlementsCombinationMap.set(key, (settlementsCombinationMap.get(key) + todayPotion));
                        owesMap.set(key, (owesMap.get(key) + todayPotion));
                    } else {
                        settlementsCombinationMap.set(key, todayPotion);
                        owesMap.set(key, todayPotion);
                    }
                    if (settlementsCombinationMap.has(oppositeKey)) {
                        if ((settlementsCombinationMap.get(key) > settlementsCombinationMap.get(oppositeKey))) {
                            settlementsCombinationMap.set(key, (settlementsCombinationMap.get(key) - settlementsCombinationMap.get(oppositeKey)));
                            settlementsCombinationMap.delete(oppositeKey);
                        } else if ((settlementsCombinationMap.get(key) < settlementsCombinationMap.get(oppositeKey))) {
                            settlementsCombinationMap.set(oppositeKey, (settlementsCombinationMap.get(oppositeKey) - settlementsCombinationMap.get(key)));
                            settlementsCombinationMap.delete(key);
                        } else {
                            settlementsCombinationMap.delete(oppositeKey);
                            settlementsCombinationMap.delete(key);
                        }
                    }
                }
            }


        }
        // console.log(" paidBill ",paidBill);
        billResponse.total_number_of_days = totalNumberOfDays;
        billResponse.total_amount = totalSpent;
        billResponse.how_much_spint = Array.from(paidBill, ([name, value]) => ({name, value}));
        billResponse.user_owes = Array.from(owesMap, ([name, value]) => ({name, value}));
        billResponse.settlements = Array.from(settlementsCombinationMap, ([name, value]) => ({name, value}));

        console.log(" billResponse ",billResponse);
        return billResponse;

    }


}