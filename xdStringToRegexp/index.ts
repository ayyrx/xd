'use strict' // 2020-08-26 15.25

/**
converts regexp strings into regexp objects
@example
xdStringToRegexp("/hello.*world/gi") // /hello.*world/gi
*/

export function xdStringToRegexp (str:string) : RegExp
{
    if (!/^\/.*\/[gimusy]*$/.test(str)) throw new Error(`invalid regex string: ${ str }`)

    const body = str.slice(1, str.lastIndexOf('/'))
    const flags = str.slice(str.lastIndexOf('/') + 1)

    return new RegExp(body, flags)
}