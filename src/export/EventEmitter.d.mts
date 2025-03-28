import type {Event} from "./Event.d.mts"
import type {PropertyTypeOf} from "./PropertyTypeOf.d.mts"

export type EventEmitter<Events extends Event[]> = {
	on: PropertyTypeOf<"on", Events>

	removeEventListener: PropertyTypeOf<"removeEventListener", Events>

	//
	// this property is only here to be able to
	// extract the type "Events" out of a
	// compounded type.
	// It is marked optional so the user never has to
	// actually provide a value for this property.
	// It is also marked readonly to signify that this value
	// should never be set.
	//
	readonly __ignoreThisPropertyAnioJSEvents?: Events
}
