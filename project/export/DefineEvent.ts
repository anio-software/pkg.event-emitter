import type {Event} from "./Event.ts"

export type DefineEvent<
	Name extends string,
	Data extends object = {}
> = Event & {
	eventName: Name
	eventUserData: Data
}
