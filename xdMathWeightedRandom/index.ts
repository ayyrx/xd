'use strict' // 2020-09-19 15.23

/**
returns a random value within the specified occurrence rates
takes an array of [weight, value] tuples, where the weight is rate of occurrence of the value relative to the sum of all weights
@example unweighted random - every value is returned with equal 1/4 probability
xdWeightedRandom([
    [1, 'sit'],
    [1, 'sed'],
    [1, 'non'],
    [1, 'qui']
])
@example weighted random
xdWeightedRandom([
    [4, 'sit'], // 4/10
    [3, 'sed'], // 3/10
    [2, 'non'], // 2/10
    [1, 'qui']  // 1/10
])
@example get a random air molecule
xdWeightedRandom([
    [78.084,   'N2'],
    [20.946,   'O2'],
    [0.934,    'Ar'],
    [0.0407,   'CO2'],
    [0.001818, 'Ne'],
    [0.000524, 'He'],
    [0.00018,  'CH4'],
    [0.000114, 'Kr'],
    [0.000055, 'H2']
])
*/

export function xdMathWeightedRandom (tuples:[weight:number, value:any][]) : any
{
    const ranges:[number, number, any][] = [] // lower bound, upper bound, value
    let lbound = 0
    let ubound = 0

    for (const tuple of tuples)
    {
        ubound = lbound + tuple[0]
        ranges.push([lbound, ubound, tuple[1]])
        lbound += tuple[0]
    }

    const rand = Math.random() * ubound // 0 <= n < ubound

    for (const range of ranges)
    {
        if (rand >= range[0] && rand < range[1]) // lbound <= rand < ubound
        {
            return range[2]
        }
    }
}