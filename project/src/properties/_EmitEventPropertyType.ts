import type {Event} from "#~src/export/Event.d.mts"
import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.d.mts"
import type {_EventsToObject} from "#~src/_EventsToObject.d.mts"

export type _EmitEventPropertyType<Events extends Event[]> = <
	EventName extends _EventsToNameUnion<Events>
>(
	eventName: EventName,
	userData: _EventsToObject<Events>[EventName]["eventUserData"],
	additionalData?: {
		source?: unknown
	}
) => number|false
