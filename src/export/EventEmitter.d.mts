import type {_EventsToMap} from "../_EventsToMap.d.mts"

export type EventEmitter<PossibleEvents extends {type :string}> = {
	on: <E extends keyof _EventsToMap<PossibleEvents>>(
		eventName: E,
		listener: (data: _EventsToMap<PossibleEvents>[E]) => undefined
	) => number

	removeEventListener: (eventHandlerId: number) => undefined
}
