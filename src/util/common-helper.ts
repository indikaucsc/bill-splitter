import { isEmpty } from "lodash";

var moment = require('moment-timezone');
moment.tz.setDefault(process.env.TIME_ZONE);
const uniqid = require('uniqid');

export class CommonHelper {

    public static generateOtp(): string {
        const otpLength: number = Number(process.env.OTP_LENGTH);
        let otp: string = '';
        for (let index = 0; index < otpLength ; index++) { otp += Math.floor(Math.random() * 9) }
        return otp;        
    }

    public static formatMobileNumber(mobile: string): any {
        if (/(^((947|07|7)(0|1|2|4|5|6|7|8)[0-9]{7})$)/.test(mobile)) {
            return '94' + mobile.substr(mobile.length - 9);
        }
        else {
            return false;
        }
    }


    public static validateMobileNumber(mobile: string): boolean {
        if (/(^\d{9,11}$)/.test(mobile)) {
            return true;
        }
        else {
            return false;
        }
    }


    public static validateMobileNumberPattern(mobile: string): boolean {
        if (/(^((947)(0|1|2|4|5|6|7|8)[0-9]{7})$)/.test(mobile)) {
            return true;
        }
        else {
            return false;
        }
    }

    public static validateMobileNumberForAllPattern(mobile: string): boolean{
        if (/(^((947|07|7)(0|1|2|4|5|6|7|8)[0-9]{7})$)/.test(mobile)) {
            return true;
        }
        else {
            return false;
        }
    }

    public static generateRequestReffrence(): string {
        const requestRef: string = uniqid() + moment().format('YYYYMMDDhhmmss');
        return requestRef;
    }


    public static validateNIC(nic: string): boolean {
        return (/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(nic));
    }


    public static validateTicketCount(count: string): boolean {
        return (/^[0-9]*$/.test(count));
    }

    public static formatLogger( ob?: any) : string {
        let msg: string = "";

       return   ob;
    }

    public static getDayByDate(date: Date): number {
        return moment(date).day() == 0 ? 7 : moment(date).day();
    }
}
