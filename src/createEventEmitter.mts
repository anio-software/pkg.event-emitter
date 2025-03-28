import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import type {Event} from "#~src/export/Event.d.mts"
import type {_EventsToNameTuple} from "#~src/_EventsToNameTuple.d.mts"
import type {EventEmitter as EventEmitterPublic} from "#~src/export/EventEmitter.d.mts"
import type {PropertyTypeOf} from "#~src/export/PropertyTypeOf.d.mts"

type EventEmitter<Events extends Event[]> = EventEmitterPublic<Events> & {
	_emitEvent: PropertyTypeOf<"_emitEvent", Events>
}

export function implementation<Events extends Event[]>(
	wrapped_context: RuntimeWrappedContextInstance,
	eventNames: _EventsToNameTuple<Events>
) : EventEmitter<Events> {
	const context = useContext(wrapped_context, 0)

	const handlers : Map<number, unknown> = new Map()
	let currentHandlerId = -1

	const eventNamesQuoted = eventNames.map(x => `'${x.toString()}'`)

	if (!eventNames.length) {
		context.log.warn(
			`initializing EventEmitter with empty event name array!`
		)
	} else {
		context.log.silly(
			`initializing event emitter with events ${eventNamesQuoted.join(", ")}`
		)
	}

	return {
		on(eventName, handler) {
			return {} as any
		},

		removeEventListener(handler) {

		},

		_emitEvent(eventName, data, additionalData) {
			return 0
		}
	}
}
