import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.d.mts"
import type {_EventsToObject} from "#~src/_EventsToObject.d.mts"

export type OnType<PossibleEvents extends {type: string}[]> = 
	<E extends _EventsToNameUnion<PossibleEvents>>(
		eventName: E,
		listener: (data: _EventsToObject<PossibleEvents>[E]) => undefined
	) => number
