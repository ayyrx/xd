'use strict' // 2020-08-26 14.51

const http = require('http')
const https = require('https')

type TOutputSuccess =
{
    code:number
    headers:{ [key:string]:any }
    body:Buffer
}

type TOutputFailure =
{
    err:Error|string
}

/**
thin, non-configurable wrapper over native http.get()/https.get()<br>
buffers the entire response, so it isn't suited for large payloads.<br>
returns:
- `{ code:number, headers:{ [key:string]:string }, body:Buffer }` upon a successful request
- `{ err:Error|string }` upon an error, timeout (60s), too many redirects (> 3), bad redirect. doesn't actually _throw_ an error
- 4xx and 5xx requests are considered to be successful
*/

export function xdHttpGet (url:string, __redirectCount = 0) : Promise<TOutputSuccess|TOutputFailure>
{
    return new Promise(resolve =>
    {
        const client = url.startsWith('https://') ? https : url.startsWith('http://') ? http : null
        if (!client) return resolve({ err: `the url must be absolute`})

        const req = client.get(url, { timeout: 60000 })

        req.on('timeout', () => resolve({ err: 'timed out (60 seconds)' }))

        req.on('error', (err:Error) => resolve({ err: err.message }))

        req.on('response', (res:any) =>
        {
            // redirect
            if ([300, 301, 302, 303, 307].includes(res.statusCode))
            {
                if (++__redirectCount > 3)
                {
                    return resolve({ err: `(server error) too many redirects (>3)`})
                }

                if (!res.headers.location)
                {
                    return resolve({ err: `(server error) encountered a redirect with no location specified` })
                }

                if (res.headers.location.startsWith('/'))
                {
                    res.headers.location = new URL(url).origin
                }

                xdHttpGet(res.headers.location, __redirectCount).then(obj => resolve(obj))
            }
            // regular response
            else
            {
                const chunks:Buffer[] = []

                res.on('data',    (chunk:Buffer) => chunks.push(chunk))
                res.on('end',     () => resolve({ code: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }))
                res.on('aborted', () => resolve({ err: 'connection lost' }))
                res.on('error',   (err:Error) => resolve({ err }))
            }
        })
    })
}