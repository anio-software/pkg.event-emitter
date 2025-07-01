/**
 * Converts a type array like:
 * 
 * [{eventName: "a", ...}, {eventName: "b", ...}, {eventName: "c", ...}]
 * 
 * Into a type object like:
 * 
 * {
 *     "a": {
 *         "eventName": "a"
 *         ...
 *     },
 * 
 *     "b": {
 *         "eventName": "b"
 *         ...
 *     },
 * 
 *     "c": {
 *         "eventName": "c"
 *         ...
 *     }
 * }
 */
import type {Event} from "#~src/export/Event.ts"
import type {_EventsToNameUnion} from "./_EventsToNameUnion.ts"
import type {Unpacked} from "./Unpacked.ts"

export type _EventsToObject<Events extends Event[]> = {
	[EventName in _EventsToNameUnion<Events>]: Extract<Unpacked<Events>, {
		eventName: EventName
	}>
}
