import type {_EventsToObject} from "../_EventsToObject.d.mts"
import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.d.mts"

export type EventEmitter<PossibleEvents extends {type :string}[]> = {
	on: <E extends _EventsToNameUnion<PossibleEvents>>(
		eventName: E,
		listener: (data: _EventsToObject<PossibleEvents>[E]) => undefined
	) => number

	removeEventListener: (eventHandlerId: number) => undefined
}
