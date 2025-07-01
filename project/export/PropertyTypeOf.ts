import type {Event} from "./Event.d.mts"
import type {OnPropertyType} from "#~src/properties/OnPropertyType.d.mts"
import type {_EmitEventPropertyType} from "#~src/properties/_EmitEventPropertyType.d.mts"
import type {RemoveEventListenerPropertyType} from "#~src/properties/RemoveEventListenerPropertyType.d.mts"

type Properties = "on"                  |
                  "_emitEvent"          |
                  "removeEventListener"

export type PropertyTypeOf<
	Property extends Properties,
	Events extends Event[]
> =
	Property extends "on" ? OnPropertyType<Events> :
	Property extends "_emitEvent" ? _EmitEventPropertyType<Events> :
	Property extends "removeEventListener" ? RemoveEventListenerPropertyType<Events> :
	never
