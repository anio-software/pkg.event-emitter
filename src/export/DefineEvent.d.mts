import type {Event} from "./Event.d.mts"

export type DefineEvent<
	Name extends string,
	Data extends object = {}
> = Event & {
	eventName: Name
	eventUserData: Data
}
