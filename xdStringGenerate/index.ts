'use strict' // 2020-08-29 15.46

type TOpts =
{
    preset:string[]
    length:number
    count:number
    interval:number
    separator:string
}

/**
generates a random string from the given preset with the specified opts:<br>
`preset` - array of substrings to generate output from  <br>
`length` - the number of preset substrings that will be used to for output<br>
`separator` - optional separator between substrings<br>
`interval` - interval at which the separator is inserted <br>
@example
xdStringGenerate({
    preset: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
    length: 32
}) // 79e9f3cdedea7410e8f742cc94841e3b

xdStringGenerate({
    preset: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
    length: 32,
    separator: '-',
    interval: 4
}) // 055e-b8d1-18b7-9173-30f4-496d-1a8b-9b3e

xdStringGenerate({
    preset: [
        'alpha', 'beta',    'gamma',
        'delta', 'epsilon', 'zeta',
        'eta',   'theta',   'iota',
        'kappa', 'lambda',  'mu',
        'nu',    'xi',      'omicron',
        'pi',    'rho',     'sigma',
        'tau',   'upsilon', 'phi',
        'chi',   'psi',     'omega'
    ],
    length: 8,
    separator: ' ',
    interval: 1
}) // nu sigma iota lambda gamma upsilon delta omega
*/

export function xdStringGenerate (opts:Partial<TOpts>) : string
{
    if (opts.preset === undefined)      opts.preset = []
    if (opts.length === undefined)      opts.length = 0
    if (opts.interval === undefined)    opts.interval = 0
    if (opts.separator   === undefined) opts.separator = ''

    let str = ''

    for (let i = 0; i < opts.length; i++)
    {
        if (opts.interval && i > 0 && i % opts.interval === 0)
        {
            str += opts.separator
        }

        str += opts.preset[Math.floor(Math.random() * opts.preset.length)]
    }

    return str
}