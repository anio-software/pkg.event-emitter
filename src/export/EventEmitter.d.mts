import type {OnType} from "./OnType.d.mts"

export type EventEmitter<PossibleEvents extends {type :string}[]> = {
	on: OnType<PossibleEvents>

	removeEventListener: (eventHandlerId: number) => undefined

	//
	// this property is only here to be able to
	// extract the type "PossibleEvents" out of a
	// compounded type.
	// It is marked optional so the user never has to
	// actually provide a value for this property.
	// It is also marked readonly to signify that this value
	// should never be set.
	//
	readonly __ignoreThisPropertyAnioJSPossibleEvents?: PossibleEvents
}
