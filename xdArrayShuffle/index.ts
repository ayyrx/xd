'use strict' // 2021-03-20 00.09

/**
reference implementation of [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm)<br>
returns a shuffled copy of the input array
@example
const ordered  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const shuffled = xdArrShuffle(ordered)
*/

export function xdArrayShuffle (array:any[]) : any[]
{
    const copy = array.slice(0)

    for (let i = copy.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1))
        const t = copy[j]
        copy[j] = copy[i]
        copy[i] = t
    }

    return copy
}