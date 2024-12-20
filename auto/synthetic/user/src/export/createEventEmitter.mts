import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {_EventsToMap} from "#~src/_EventsToMap.d.mts"
/* couldn't find a user defined type named 'E' at the top level */
type EventEmitter<PossibleEvents extends {
	type: string;
}> = {
	on: <E extends keyof _EventsToMap<PossibleEvents>>(eventName: E, listener: (data: _EventsToMap<PossibleEvents>[E]) => undefined) => number;
	removeEventListener: (eventHandlerId: number) => undefined;
	_emitEvent: <E extends keyof _EventsToMap<PossibleEvents>>(eventName: E, eventData: Omit<_EventsToMap<PossibleEvents>[E], "type">) => undefined;
}
type Handler<PossibleEvents extends {
	type: string;
}> = {
	type: keyof _EventsToMap<PossibleEvents>;
	handler: (eventData: any) => undefined;
}
/* couldn't find a user defined type named 'Map' at the top level */
/* couldn't find a user defined type named 'Omit' at the top level */
/* couldn't find a user defined type named 'PossibleEvents' at the top level */
// ^^^--- types needed for implementation

import {createEventEmitterFactory as factory} from "#~synthetic/user/export/createEventEmitterFactory.mts"

const fn = factory(createContext())

export function createEventEmitter<PossibleEvents extends {type: string}>(eventNames: (keyof _EventsToMap<PossibleEvents>)[]) : EventEmitter<PossibleEvents> {
	return fn(eventNames)
}
