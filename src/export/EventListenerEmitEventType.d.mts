import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.d.mts"
import type {_EventsToObject} from "#~src/_EventsToObject.d.mts"

export type EventListenerEmitEventType
	<PossibleEvents extends {type: string}[]> =
		<E extends _EventsToNameUnion<PossibleEvents>>(
			eventName: E,
			eventData: Omit<_EventsToObject<PossibleEvents>[E], "type">
		) => undefined
