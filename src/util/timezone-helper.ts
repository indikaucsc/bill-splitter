var moment = require('moment-timezone');
moment.tz.setDefault(process.env.TIME_ZONE);

export class TimezoneHelper {

    public static getDefaultTimeZone(time: Date): Date {

        let formattedTime: Date = null;

        if (time) {
            formattedTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
        }
        return formattedTime;
    }

    public static loggerTime(time: Date): Date {

        let formattedTime: Date = null;

        if (time) {
            formattedTime = moment(time).format('YYYY-MM-DD HH:mm:ss.SSSS');
        }
        return formattedTime;
    }

    public static getMomentDate(date: string = ''): any {
        return date ? moment(date) : moment();
    }

    public static getFormattedTime(time ?: Date): Date {

        if (time) {
            return moment(time).format('YYYY-MM-DD HH:mm:ss');
        } else{
            return moment().format("YYYY-MM-DD HH:mm:ss");
        }
    }

    public static formatDateTime(dateTime: Date, format: string): Date {
        return moment(dateTime).format(format);
    
    }

}
