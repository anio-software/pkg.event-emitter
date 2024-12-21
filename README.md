# @aniojs/event-emitter

Creates an event emitter.

For the interface you would do something like this:

```ts
import type {EventEmitter} from "@aniojs/event-emitter"

type MyCustomEvent1 = {
	type: "event1" // <-- this property is always required
	payload: number
}

type MyCustomEvent2 = {
	type: "event2" // <-- this property is always required
	anotherPayload: string
	someOtherPayload: number[]
}

export type MyEvents = [MyCustomEvent1, MyCustomEvent2] // <-- must be a tuple

export type MyObject = EventEmitter<MyEvents> & {
	// type definition of MyObject here
}

export declare function createMyObject(): MyObject
```

And for the implementation:

```ts
import type {MyObject, MyEvents} from "./interface.d.mts"
import {createEventEmitter} from "@aniojs/event-emitter"

export function createMyObject(): MyObject {
	const {on, removeEventListener, _emitEvent} = createEventEmitter<MyEvents>([
		"event1", "event2" // <-- must appear in the same order as in the MyEvents tuple
	])

	let obj: MyObject = {
		on, removeEventListener
	}

	_emitEvent("event1", {payload: 1})
	_emitEvent("event2", {anotherPayload: "test", someOtherPayload: [1, 2]})

	return obj
}
```
