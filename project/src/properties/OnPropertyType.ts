import type {Event} from "#~export/Event.ts"
import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.ts"
import type {_EventsToObject} from "#~src/_EventsToObject.ts"
import type {EventListener} from "#~export/EventListener.ts"

export type OnPropertyType<Events extends Event[]> = <
	EventName extends _EventsToNameUnion<Events>
>(
	on: EventName,
	listener: (
		data: _EventsToObject<Events>[EventName]["eventUserData"],
		event: _EventsToObject<Events>[EventName]
	) => undefined
) => EventListener|false
