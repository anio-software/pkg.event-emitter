import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {_EventsToNameTuple} from "#~src/_EventsToNameTuple.d.mts"
import type {Event} from "#~src/export/Event.d.mts"
type EventEmitter<Events extends Event[]> = EventEmitterPublic<Events> & {
	_emitEvent: PropertyTypeOf<"_emitEvent", Events>;
}
import type {EventEmitter as EventEmitterPublic} from "#~src/export/EventEmitter.d.mts"
/* couldn't find a user defined type named 'Events' at the top level */
/* couldn't find a user defined type named 'Map' at the top level */
import type {PropertyTypeOf} from "#~src/export/PropertyTypeOf.d.mts"
// ^^^--- types needed for implementation

import {createEventEmitterFactory as factory} from "#~synthetic/user/export/createEventEmitterFactory.mts"

const fn = factory(createContext())

export function createEventEmitter<Events extends Event[]>(eventNames: _EventsToNameTuple<Events>) : EventEmitter<Events> {
	return fn(eventNames)
}
