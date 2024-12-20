import {implementation} from "#~src/createEventEmitter.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv--- types needed for implementation
import type {_EventsToMap} from "#~src/_EventsToMap.d.mts"
/* couldn't find a user defined type named 'E' at the top level */
type EventEmitter<PossibleEvents extends {
	type: string;
}> = {
	on: <E extends keyof _EventsToMap<PossibleEvents>>(eventName: E, listener: (data: _EventsToMap<PossibleEvents>[E]) => undefined) => number;
	removeEventListener: (eventHandlerId: number) => undefined;
	_emitEvent: <E extends keyof _EventsToMap<PossibleEvents>>(eventName: E, eventData: Omit<_EventsToMap<PossibleEvents>[E], "type">) => undefined;
}
type Handler<PossibleEvents extends {
	type: string;
}> = {
	type: keyof _EventsToMap<PossibleEvents>;
	handler: (eventData: any) => undefined;
}
/* couldn't find a user defined type named 'Map' at the top level */
/* couldn't find a user defined type named 'Omit' at the top level */
/* couldn't find a user defined type named 'PossibleEvents' at the top level */
// ^^^--- types needed for implementation

declare function createEventEmitter<PossibleEvents extends {type: string}>(
	eventNames: (keyof _EventsToMap<PossibleEvents>)[]
) : EventEmitter<PossibleEvents>

/**
 * @brief
 * Create an instance of the function 'createEventEmitter'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'createEventEmitter'.
 */
export function createEventEmitterFactory(context: RuntimeWrappedContextInstance) : typeof createEventEmitter {
	const project = getProject()
	const local_context : RuntimeWrappedContextInstance = {
		...context,
		_package: {
			name: project.package_json.name,
			version: project.package_json.version,
			author: project.package_json.author,
			license: project.package_json.license
		}
	}

	return function createEventEmitter<PossibleEvents extends {type: string}>(eventNames: (keyof _EventsToMap<PossibleEvents>)[]) : EventEmitter<PossibleEvents> {
		return implementation(local_context, eventNames)
	}
}
