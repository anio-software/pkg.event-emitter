/**
 * Converts a type array like:
 * 
 * [{eventName: "a", ...}, {eventName: "b", ...}]
 * 
 * Into a type union like:
 * 
 * "a" | "b"
 */
import type {Event} from "#~src/export/Event.d.mts"

export type _EventsToNameUnion<Events extends Event[]> = Events[number]["eventName"]
