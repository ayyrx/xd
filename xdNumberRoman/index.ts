'use strict' // 2020-08-26 14.59

const romans   = [ 'm', 'cm', 'd', 'cd', 'c', 'xc', 'l', 'xl', 'x', 'ix', 'v', 'iv', 'i']
const decimals = [1000,  900,  500, 400,  100, 90,   50,  40,   10,  9,    5,   4,    1 ]

export class xdNumberRoman
{
    /**
    only integers > 0
    @example
    xdNumberRoman.encode(5)    // 'V'
    xdNumberRoman.encode(988)  // 'CMLXXXVIII'
    xdNumberRoman.encode(0)    // error
    xdNumberRoman.encode(-123) // error
    xdNumberRoman.encode(5.51) // error
    */

    static encode (decimal:number) : string
    {
        if (decimal < 1 || Math.floor(decimal) !== decimal) throw new Error(`the number must be an integer > 0, got ${ decimal }`)

        let roman = ''

        for (let i = 0; i <= 13; i++)
        {
            while (decimal % decimals[i] < decimal)
            {
                roman += romans[i]
                decimal -= decimals[i]
            }
        }

        return roman.toUpperCase()
    }

    /**
    the string can be provided with any case
    @example
    xdNumberRoman.encode('v')          // 5
    xdNumberRoman.encode('CMLXXXVIII') // 988
    xdNumberRoman.encode('foobar')     // error
    */

    static decode (roman:string) : number
    {
        roman = roman.toLowerCase()

        let decimal = 0

        for (let i = 0; i <= 13; i++)
        {
            while (roman.indexOf(romans[i]) === 0)
            {
                decimal += decimals[i]
                roman  = roman.replace(romans[i], '')
            }
        }

        if (!decimal)
        {
            throw new Error(`not a roman numeral: ${ roman }`)
        }

        return decimal
    }
}