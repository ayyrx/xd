'use strict' // 2021-01-17 08.23

type TUnit = 'ms|seconds|minutes|hours|days|weeks|months|years'

const units:{ [key:string]:number } =
{
    ms:      1,
    seconds: 1000,
    minutes: 60000,
    hours:   3600000,
    days:    86400000,
    weeks:   604800000,
    months:  2592000000,
    years:   31536000000
}

/**
assumes 365-day years and 30-day months, so there's an unavoidable glitch with months-years conversion, which is left as is for consistency and simplicity
@example
xdDatetimeConvert(1, 'years', 'ms')      // 31536000000
xdDatetimeConvert(1, 'years', 'seconds') // 31536000
xdDatetimeConvert(1, 'years', 'minutes') // 525600
xdDatetimeConvert(1, 'years', 'hours')   // 8760
xdDatetimeConvert(1, 'years', 'days')    // 365
xdDatetimeConvert(1, 'years', 'weeks')   // 52.142857142857146
xdDatetimeConvert(1, 'years', 'months')  // 12.166666666666666
*/

export function xdDatetimeConvert (value:number, from:TUnit, to: TUnit) : number
{
    return value * units[from] / units[to]
}