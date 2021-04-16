'use strict' // 2021-01-18 13.32

export class xdStringBase64
{
    /**
    equivalent of [btoa](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa)
    @example
    xdStringBase64.encode('lorem ipsum dolor') // 'bG9yZW0gaXBzdW0gZG9sb3I='
    */

    static encode (input:string) : string
    {
        return Buffer.from(input, 'binary').toString('base64')
    }

    /**
    equivalent of [atob](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob)
    @example
    xdStringBase64.decode('bG9yZW0gaXBzdW0gZG9sb3I=') // 'lorem ipsum dolor'
    */

    static decode (input:string) : string
    {
        return Buffer.from(input, 'base64').toString('binary')
    }
}