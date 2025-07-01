import type {Event} from "./Event.ts"
import type {OnPropertyType} from "#~src/properties/OnPropertyType.ts"
import type {_EmitEventPropertyType} from "#~src/properties/_EmitEventPropertyType.ts"
import type {RemoveEventListenerPropertyType} from "#~src/properties/RemoveEventListenerPropertyType.ts"

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
