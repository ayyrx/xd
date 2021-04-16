'use strict' // 2021-03-19 13.32

/**
given an array of `x.y.z` semver strings, returns a sorted copy
@example
xdSemverSort(['1.2.1', '1.2.4', '1.2.0', '1.0.0', '69.420.1337'])
 // ['69.420.1337', '1.2.4', '1.2.1', '1.2.0', '1.0.0']
xdSemverSort(['1.2.1', '1.2.4', '1.2.0', '1.0.0', '69.420.1337', '21.22'])
 // error - '21.22' is not a semver string
*/

export function xdSemverSort (arr:string[]) : string[]
{
    const splits:[string, string, string][] = []

    for (const ver of arr)
    {
        if (!/^\d+\.\d+\.\d+$/.test(ver))
        {
            throw new Error(`not a semver string: ${ ver }`)
        }

        splits.push(ver.split('.') as [string, string, string])
    }

    const lengths = [0, 0, 0]

    for (const split of splits)
    {
        for (let i = 0; i < 3; i++)
        {
            if (lengths[i] < split[i].length)
            {
                lengths[i] = split[i].length
            }
        }
    }

    /** { '694201337': '69.420.1337', '010020001': '1.2.1', ... } */
    const pairs:{ [key:string]:string} = {}

    for (const splitVer of splits)
    {
        const ver = splitVer.join('.')

        for (let i = 0; i < 3; i++)
        {
            splitVer[i] = splitVer[i].padStart(lengths[i], '0')
        }

        pairs[splitVer.join('')] = ver
    }

    //

    const output = []

    for (const verStr of Object.keys(pairs).sort().reverse())
    {
        output.push(pairs[verStr])
    }

    return output
}