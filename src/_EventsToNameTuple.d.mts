/**
 * Converts a type array like:
 * 
 * [{eventName: "a", ...}, {eventName: "b", ...}]
 * 
 * Into a type array like:
 * 
 * ["a", "b"]
 */
import type {Event} from "#~src/export/Event.d.mts"

export type _EventsToNameTuple<Events extends Event[]> = 
	Events extends [infer First, ...infer Rest] ? (
		First extends {eventName: infer U} ? (
			Rest extends Event[] ? [U, ..._EventsToNameTuple<Rest>] : never
		) : never
	): []
