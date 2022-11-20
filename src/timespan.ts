const MILISECOND = 1;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export const MILISECONDS_PATTERN = /(\d+ms)/;
export const SECONDS_PATTERN = /(\d+)s/;
export const MINUTES_PATTERN = /(\d+)m(?!s)/;
export const HOURS_PATTERN = /(\d+)h/;

export class TimeSpan {
    ms: number;

    constructor(ms: number) {
        this.ms = ms;
    }

    private static parse(text: string, pattern: RegExp) {
        const matched = text.match(pattern);

        if (!matched?.[0] || !matched?.[1]) {
            return 0;
        } else {
            const parsed = Number.parseInt(matched[1]);
            if (Number.isNaN(parsed)) return 0;
            return parsed;
        }
    }

    static valueOf(text: string) {
        const miliseconds = TimeSpan.parse(text, MILISECONDS_PATTERN);
        const seconds = TimeSpan.parse(text, SECONDS_PATTERN) * SECOND;
        const minutes = TimeSpan.parse(text, MINUTES_PATTERN) * MINUTE;
        const hours = TimeSpan.parse(text, HOURS_PATTERN) * HOUR;

        return new TimeSpan(miliseconds + seconds + minutes + hours);
    }

    getMiliseconds() {
        return this.ms;
    }

    getSeconds() {
        return this.ms / SECOND;
    }

    getMinutes() {
        return this.ms / MINUTE;
    }

    getHours() {
        return this.ms / HOUR;
    }

    toString(): string {
        let value = this.ms;

        const hourRatio = Math.trunc(value / HOUR);
        value -= HOUR * hourRatio;
        const minuteRatio = Math.trunc(value / MINUTE);
        value -= MINUTE * minuteRatio;
        const secondRatio = Math.trunc(value / SECOND);
        value -= SECOND * secondRatio;
        const ms = value;
        value -= ms;

        const parts = new Set<string>();
        if (hourRatio > 0) parts.add(`${hourRatio}h`);
        if (minuteRatio > 0) parts.add(`${minuteRatio}m`);
        if (secondRatio > 0) parts.add(`${secondRatio}s`);
        if (ms > 0) parts.add(`${ms}ms`);

        return Array.from(parts).join(" ");
    }
}
