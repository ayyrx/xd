'use strict' // 2020-08-26 15.10

/**
generate all possible permutations with the specified length from the specified preset
@example
xdSetGenerate(['a', 'b', 'c'], 0)
 // []

xdSetGenerate(['a', 'b', 'c'], 1)
 // [
 //     [ 'a' ],
 //     [ 'b' ],
 //     [ 'c' ]
 // ]

xdSetGenerate(['a', 'b', 'c'], 2)
 // [
 //     [ 'a', 'a' ],
 //     [ 'a', 'b' ],
 //     [ 'a', 'c' ],
 //     [ 'b', 'a' ],
 //     [ 'b', 'b' ],
 //     [ 'b', 'c' ],
 //     [ 'c', 'a' ],
 //     [ 'c', 'b' ],
 //     [ 'c', 'c' ]
 // ]

xdSetGenerate(['a', 'b', 'c'], 3)
 // [
 //     [ 'a', 'a', 'a' ], [ 'a', 'a', 'b' ],
 //     [ 'a', 'a', 'c' ], [ 'a', 'b', 'a' ],
 //     [ 'a', 'b', 'b' ], [ 'a', 'b', 'c' ],
 //     [ 'a', 'c', 'a' ], [ 'a', 'c', 'b' ],
 //     [ 'a', 'c', 'c' ], [ 'b', 'a', 'a' ],
 //     [ 'b', 'a', 'b' ], [ 'b', 'a', 'c' ],
 //     [ 'b', 'b', 'a' ], [ 'b', 'b', 'b' ],
 //     [ 'b', 'b', 'c' ], [ 'b', 'c', 'a' ],
 //     [ 'b', 'c', 'b' ], [ 'b', 'c', 'c' ],
 //     [ 'c', 'a', 'a' ], [ 'c', 'a', 'b' ],
 //     [ 'c', 'a', 'c' ], [ 'c', 'b', 'a' ],
 //     [ 'c', 'b', 'b' ], [ 'c', 'b', 'c' ],
 //     [ 'c', 'c', 'a' ], [ 'c', 'c', 'b' ],
 //     [ 'c', 'c', 'c' ]
 // ]
*/

export function xdSetGenerate (preset:any[], length:number) : any[]
{
    if (!preset.length || !length) return []

    const sets = []
    const map = new Array(length).fill(0)

    while (1)
    {
        // generating a set

        const set = []

        for (let i = 0; i < map.length; i++)
        {
            set.push(preset[map[i]])
        }

        sets.push(set)

        // updating the map

        for (let i = map.length - 1; i >= 0; i--)
        {
            // bump

            if (map[i] + 1 < preset.length)
            {
                map[i]++

                for (let j = i + 1; j < map.length; j++)
                {
                    map[j] = 0
                }

                break
            }

            // no bump

            if (i === 0) return sets
        }
    }

    return [] // tshit
}