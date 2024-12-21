import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {_EmitEventType} from "#~src/export/_EmitEventType.d.mts"
import type {_EventsToNameTuple} from "#~src/_EventsToNameTuple.d.mts"
import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.d.mts"
import type {_EventsToObject} from "#~src/_EventsToObject.d.mts"
/* couldn't find a user defined type named 'E' at the top level */
type EventEmitter<PossibleEvents extends {
	type: string;
}[]> = {
	on: <E extends _EventsToNameUnion<PossibleEvents>>(eventName: E, listener: (data: _EventsToObject<PossibleEvents>[E]) => undefined) => number;
	removeEventListener: (eventHandlerId: number) => undefined;
	_emitEvent: _EmitEventType<PossibleEvents>;
}
type Handler<PossibleEvents extends {
	type: string;
}[]> = {
	type: _EventsToNameUnion<PossibleEvents>;
	handler: (eventData: any) => undefined;
}
/* couldn't find a user defined type named 'Map' at the top level */
/* couldn't find a user defined type named 'Omit' at the top level */
/* couldn't find a user defined type named 'PossibleEvents' at the top level */
// ^^^--- types needed for implementation

import {createEventEmitterFactory as factory} from "#~synthetic/user/export/createEventEmitterFactory.mts"

const fn = factory(createContext())

export function createEventEmitter<PossibleEvents extends {type: string}[]>(eventNames: _EventsToNameTuple<PossibleEvents>) : EventEmitter<PossibleEvents> {
	return fn(eventNames)
}
