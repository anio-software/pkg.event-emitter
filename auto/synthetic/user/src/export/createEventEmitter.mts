import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {_EventsToNameTuple} from "#~src/_EventsToNameTuple.d.mts"
import type {Event} from "#~src/export/Event.d.mts"
import type {EventEmitter} from "#~src/export/EventEmitter.d.mts"
type EventHandler = (data: object, event: Event) => undefined
import type {EventListener} from "#~src/export/EventListener.d.mts"
/* couldn't find a user defined type named 'Map' at the top level */
// ^^^--- types needed for implementation

import {createEventEmitterFactory as factory} from "#~synthetic/user/export/createEventEmitterFactory.mts"

export function createEventEmitter<Events extends Event[]>(eventNames: _EventsToNameTuple<Events>) : EventEmitter<Events, true> {
	const __fnImplementation = factory(createContext())

	return __fnImplementation(eventNames)
}
