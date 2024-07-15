import { MAX_TIME_FRAME, MIN_TIME_FRAME } from "../constants";

export class Format {
    static largeBytesToShortString(b: number): string {
        if (b >= 1_000_000_000_000) {
            return (b / 1_000_000_000_000).toFixed(2) + "tb";
        } else if (b >= 1_000_000_000) {
            return (b / 1_000_000_000).toFixed(2) + "gb";
        } else if (b >= 1_000_000) {
            return (b / 1_000_000).toFixed(1) + "mb";
        } else if (b >= 1_000) {
            return Math.floor(b / 1_000) + "kb";
        } else {
            return b + "b";
        }
    }

    static largeNumberToShortString(n: number, decimals?: number): string {
        const absN = Math.abs(n);
        let ret = "";
        if (absN >= 1_000_000_000) {
            ret = (absN / 1_000_000_000).toFixed(2) + "b";
        } else if (absN >= 1_000_000) {
            ret = (absN / 1_000_000).toFixed(2) + "m";
        } else if (absN >= 1_000) {
            ret= (absN / 1_000).toFixed(1) + "k";
        } else {
            ret= absN.toFixed(decimals)
        }
        if (n < 0) {
            ret = "-" + ret;
        }
        return ret;
    }

    static readonly WEEK = 604800000;          // 7 days in milliseconds
    static readonly DAY = 86400000;            // 1 day in milliseconds

    static labelToTimeFrame(label: string): number {
        const regex = /^(\d+)([wdhms]?)$/;
        const match = label.match(regex);
        if (!match) {
            throw new Error("Invalid label format");
        }

        const value = parseInt(match[1]);
        const unit = match[2];

        switch (unit) {
            case 'w':
                return value * Format.WEEK;
            case 'd':
                return value * Format.DAY;
            case 'h':
                return value * (60 * 60 * 1000);
            case 'm':
                return value * (60 * 1000);
            case 's':
                return value * 1000;
            case 'ms':
                return value;
            default:
                throw new Error("Invalid label format");
        }
    }

    static timeFrameToLabel(timeFrame: number, full?: boolean): string | Error {
        if (timeFrame > MAX_TIME_FRAME) {
            return new Error("time frame is too large");
        }
        if (timeFrame < MIN_TIME_FRAME) {
            return new Error("time frame is too small");
        }
        if (timeFrame % MIN_TIME_FRAME !== 0) {
            return new Error(`time frame must be a multiple of ${MIN_TIME_FRAME / 1000} seconds`);
        }

        if (timeFrame % Format.WEEK === 0) {
            const weeks = timeFrame / Format.WEEK;
            return `${weeks}${full ? ' ' : ''}w${full ? 'eek' : ''}${full ? weeks === 1 ? '' : 's' : ''}`;
        }
        if (timeFrame % Format.DAY === 0) {
            const days = timeFrame / Format.DAY;
            return `${days}${full ? ' ' : ''}d${full ? 'ay' : ''}${full ? days === 1 ? '' : 's' : ''}`;
        }
        if (timeFrame % (60 * 60 * 1000) === 0) { // 1 hour in milliseconds
            const hours = timeFrame / (60 * 60 * 1000);
            return `${hours}${full ? ' ' : ''}h${full ? 'our' : ''}${full ? hours === 1 ? '' : 's': ''}`;
        }
        if (timeFrame % (60 * 1000) === 0) {      // 1 minute in milliseconds
            const minutes = timeFrame / (60 * 1000);
            return `${minutes}${full ? ' ' : ''}m${full ? 'inute' : ''}${full ? minutes === 1 ? '' : 's': ''}`;
        }
        if (timeFrame % (1000) === 0) {      // 1 second in milliseconds
            const seconds = timeFrame / 1000;
            return `${seconds}${full ? ' ' : ''}s${full ? 'econd' : ''}${full ? seconds === 1 ? '' : 's': ''}`;
        }

        return `${timeFrame}ms`;
    }

    static strDateToUnix(dateStr: string): Date {
        try {
            // Assuming the input dateStr is in the format "YYYY-MM-DD"
            const [year, month, day] = dateStr.split('-').map(Number);
            const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // Set time to 00:00:00 UTC
            return date
        } catch (error) {
            throw new Error("Invalid date format");
        }
    }

    // Formats a UNIX timestamp as a date string in the format "YYYY-MM-DD"
    static unixTimestampToStrDate(unix: Date): string {
        return unix.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
    }

    static toUTCDate(date: Date): Date {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    }

    static stringToNumber(str:string) {
        return str.split('').reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0);
    }
    
    
}

