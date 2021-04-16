'use strict' // 2021-01-17 19.52

/**
synchronous `sleep()` for node
@example
console.log(Date.now()) // xxxxxxxxx0000
xdSleep(1000)
console.log(Date.now()) // xxxxxxxxx1000
*/

export function xdSleep (ms:number) : void
{
    Atomics.wait(new Int32Array(new SharedArrayBuffer(1024)), 0, 0, ms);
}