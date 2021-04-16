'use strict' // 2021-03-19 18.19

type listener = (event:string, data?:any) => void

/**
barebone implementation of an Observer-type class similar to [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)/
[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)<br>
*/

export class Emitter
{
    private events:{ [event:string]:listener[] } = Object.create(null)

    /**
     * the list of events given to the constructor dictates which events this instance can "emit" and "listen" to
     * @example
     * const emitter = new Emitter(['beep', 'boop' 'ding', 'dong'])
     * emitter.listen('beep', () => console.log('beeped'))
     * emitter.emit('beep')
     * */

    constructor (events:string[])
    {
        for (const event of events)
        {
            this.events[event] = []
        }

        Object.seal(this.events)
    }

    /**
    calls all listeners subscribed to the event
    listeners are called synchronously, in the same order they were added.<br>
    return values of listeners are ignored
    */

    emit = (event:string, data?:any) =>
    {
        if (!Object.prototype.hasOwnProperty.call(this.events, event))
        {
            throw new Error(`unknown event: ${ event }`)
        }

        for (const listener of this.events[event])
        {
            listener(event, data)
        }
    }

    /**
    adds an event listener
    */

    listen = (event:string, listener:listener) =>
    {
        if (!Object.prototype.hasOwnProperty.call(this.events, event))
        {
            throw new Error(`unknown event: ${ event }`)
        }

        if (this.events[event].includes(listener))
        {
            throw new Error(`the listener is already used for the event`)
        }

        this.events[event].push(listener)
    }

    /**
    removes an event listener
    */

    unlisten = (event:string, listener:listener) =>
    {
        if (!Object.prototype.hasOwnProperty.call(this.events, event))
        {
            throw new Error(`unknown event: ${ event }`)
        }

        if (!this.events[event].includes(listener))
        {
            throw new Error(`the handler not attached to the property`)
        }

        this.events[event].splice(this.events[event].indexOf(listener), 1)
    }
}