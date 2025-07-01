import type {Event} from "#~export/Event.ts"
import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.ts"
import type {_EventsToObject} from "#~src/_EventsToObject.ts"

export type _EmitEventPropertyType<Events extends Event[]> = <
	EventName extends _EventsToNameUnion<Events>
>(
	eventName: EventName,
	userData: _EventsToObject<Events>[EventName]["eventUserData"],
	additionalData?: {
		source?: unknown
	}
) => number|false
