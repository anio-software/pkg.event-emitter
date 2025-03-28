import type {Event} from "#~src/export/Event.d.mts"
import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.d.mts"
import type {_EventsToObject} from "#~src/_EventsToObject.d.mts"
import type {EventListener} from "#~src/export/EventListener.d.mts"

export type OnPropertyType<Events extends Event[]> = <
	EventName extends _EventsToNameUnion<Events>
>(
	on: EventName,
	listener: (
		data: _EventsToObject<Events>[EventName]["eventUserData"],
		event: _EventsToObject<Events>[EventName]
	) => undefined
) => EventListener
