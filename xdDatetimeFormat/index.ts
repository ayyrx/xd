'use strict' // 2021-04-15 04.30

const funTokens:{ [key:string]:(date:Date) => string } =
{
    '{yy}':      (date:Date) => date.getFullYear().toString().slice(2),
    '{yyyy}':    (date:Date) => date.getFullYear().toString(),
    '{M}':       (date:Date) => (date.getMonth() + 1).toString(),
    '{MM}':      (date:Date) => (date.getMonth() + 1).toString().padStart(2, '0'),
    '{d}':       (date:Date) => date.getDate().toString(),
    '{dd}':      (date:Date) => date.getDate().toString().padStart(2, '0'),
    '{h24}':     (date:Date) => date.getHours().toString(),
    '{hh24}':    (date:Date) => date.getHours().toString().padStart(2, '0'),
    '{h12}':     (date:Date) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][date.getHours()].toString(),
    '{hh12}':    (date:Date) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][date.getHours()].toString().padStart(2, '0'),
    '{m}':       (date:Date) => date.getMinutes().toString(),
    '{mm}':      (date:Date) => date.getMinutes().toString().padStart(2, '0'),
    '{s}':       (date:Date) => date.getSeconds().toString(),
    '{ss}':      (date:Date) => date.getSeconds().toString().padStart(2, '0'),
    '{ms}':      (date:Date) => date.getMilliseconds().toString(),
    '{msmsms}':  (date:Date) => date.getMilliseconds().toString().padStart(3, '0'),
    '{p}':       (date:Date) => date.getHours() < 12 ? 'am' : 'pm',
    '{mon}':     (date:Date) => ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()],
    '{month}':   (date:Date) => ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][date.getMonth()],
    '{wday}':    (date:Date) => ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][date.getDay()],
    '{weekday}': (date:Date) => ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][date.getDay()],
    '{tzs}':     (date:Date) => date.getTimezoneOffset() > 0 ? '-' : '+', // yes
    '{tzh}':     (date:Date) => (Math.floor(Math.abs(date.getTimezoneOffset()) / 60)).toString(),
    '{tzhh}':    (date:Date) => (Math.floor(Math.abs(date.getTimezoneOffset()) / 60)).toString().padStart(2, '0'),
    '{tzm}':     (date:Date) => (Math.abs(date.getTimezoneOffset()) % 60).toString(),
    '{tzmm}':    (date:Date) => (Math.abs(date.getTimezoneOffset()) % 60).toString().padStart(2, '0')
}

/**
formats a `Date` object into a string according to the specified format.<br>
tokens:<br>
`{yy}` - year  <br>
`{yyyy}` - full year  <br>
`{M}` - month 1-12 <br>
`{MM}` - month 01-12 (0-padded)  <br>
`{mon}` / `{Mon}` / `{MON}` - truncated month name - jan / Jan / JAN  <br>
`{month}` / `{Month}` / `{MONTH}` - full month name - january / January / JANUARY  <br>
`{d}` - day, 1-31  <br>
`{dd}` - day, 01-31  <br>
`{h24}` - 24h hour 0-23  <br>
`{hh24}` - 24h hour 00-23  <br>
`{h12}` - 12h hour 1-12    <br>
`{hh12}` - 12h hour 01-12  <br>
`{m}` - minutes 0-59  <br>
`{mm}` - minutes 00-59  <br>
`{s}` - seconds, 0-59  <br>
`{ss}` - seconds, 00-59  <br>
`{ms}` - miliseconds, 0-999  <br>
`{msmsms}` - miliseconds, 000-999  <br>
`{weekday}` / `{Weekday}` / `{WEEKDAY}` - full weekday, e.g. saturday / Saturday / SATURDAY  <br>
`{wday}` / `{Wday}` / `{WDAY}` - truncated weekday, e.g. sat / Sat / SAT  <br>
`{p}` / `{P}` - time period, am / pm or AM / PM
`{tzs}` - timezone offset +/- <br>
`{tzh}` / `{tzhh}` - timezone offset hours <br>
`{tzm}` / `{tzmm}` - timezone offset minutes
@example
xdDatetimeFormat(new Date(), '{yyyy}-{MM}-{dd}T{hh24}:{mm}:{ss}.{msmsms}{tzs}{tzhh}:{tzmm}') // 2020-10-15T13:37:00.000+01:00
xdDatetimeFormat(new Date(), '{MM}-{dd}-{yyyy} ({Wday}) {h12}:{mm} {P}')                     // 10-15-2020 (Sun) 1:37 PM
*/

export function xdDatetimeFormat (date:Date, format:string) : string
{
    const formatTokens = format.match(/{.*?}/g)

    if (!formatTokens)
    {
        throw new Error(`no tokens in the format string: ${ format }`)
    }

    let output = format

    for (const token of formatTokens)
    {
        if (funTokens[token])
        {
            output = output.replace(token, funTokens[token](date))
        }
        else if (funTokens[token.toLowerCase()])
        {
            let out = funTokens[token.toLowerCase()](date)

            if (token === token.toUpperCase())
            {
                out = out.toUpperCase()
            }
            else
            {
                out = out[0].toUpperCase() + out.slice(1)
            }

            output = output.replace(token, out)
        }
        else
        {
            throw new Error(`unrecognized token in the format string: ${ token }`)
        }
    }

    return output
}