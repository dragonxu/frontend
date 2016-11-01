import {computedFrom} from "aurelia-framework";
import {Toolbox} from "../components/toolbox";
import Shared from "../components/shared";

export class Schedule {
    constructor(schedule, timeBased) {
        this.i18n = Shared.get('i18n');
        this.timeBased = timeBased;
        this.nightTemperature = undefined;
        this.day1Temperature = undefined;
        this.day2Temperature = undefined;
        this.day1Start = undefined;
        this.day1End = undefined;
        this.day2Start = undefined;
        this.day2End = undefined;
        if (schedule !== undefined) {
            this.load(schedule);
        }
    }

    load(schedule) {
        // [temp_n(Temp), start_d1(Time), stop_d1(Time), temp_d1(Temp), start_d2(Time), stop_d2(Time), temp_d2(Temp)]
        this.nightTemperature = schedule[0];
        this.day1Start = Toolbox.parseTime(schedule[1], '8:00');
        this.day1End = Toolbox.parseTime(schedule[2], '10:00');
        this.day1Temperature = schedule[3];
        this.day2Start = Toolbox.parseTime(schedule[4], '16:00');
        this.day2End = Toolbox.parseTime(schedule[5], '20:00');
        this.day2Temperature = schedule[6];
        this.ensureValidity();
    }

    ensureValidity() {
        // Normal schedule temperature range is considered to be between 15 (6 for cooling) and 25 degrees
        if (this.nightTemperature === 95.5) {
            this.nightTemperature = 16;
        }
        if (this.day1Temperature === 95.5) {
            this.day1Temperature = 20;
        }
        if (this.day2Temperature === 95.5) {
            this.day2Temperature = 20;
        }
        this.nightTemperature = Math.min(this.nightTemperature, this.day1Temperature, this.day2Temperature);
        // Make sure the times are at least sorted correctly
        let times = [this.day1Start, this.day1End, this.day2Start, this.day2End];
        times.sort((a, b) => {
            return a - b;
        });
        this.day1Start = times[0];
        this.day1End = times[1];
        this.day2Start = times[2];
        this.day2End = times[3];
    }

    @computedFrom('day1Start', 'day1End', 'day2Start', 'day2End', 'day1Temperature', 'day2Temperature', 'nightTemperature')
    get scheduleInfo() {
        if (this.timeBased) {
            return this.i18n.tr('generic.scheduleinfosimple', {
                day1start: Toolbox.minutesToString(this.day1Start),
                day1end: Toolbox.minutesToString(this.day1End),
                day2start: Toolbox.minutesToString(this.day2Start),
                day2end: Toolbox.minutesToString(this.day2End)
            });
        }
        return this.i18n.tr('generic.scheduleinfo', {
            day1temp: this.day1Temperature,
            day1start: Toolbox.minutesToString(this.day1Start),
            day1end: Toolbox.minutesToString(this.day1End),
            day2temp: this.day2Temperature,
            day2start: Toolbox.minutesToString(this.day2Start),
            day2end: Toolbox.minutesToString(this.day2End),
            nighttemp: this.nightTemperature,
            interpolation: {escape: false}
        });
    }

    get systemSchedule() {
        return [
            this.nightTemperature,
            Toolbox.minutesToString(this.day1Start),
            Toolbox.minutesToString(this.day1End),
            this.day1Temperature,
            Toolbox.minutesToString(this.day2Start),
            Toolbox.minutesToString(this.day2End),
            this.day2Temperature
        ];
    }
}
