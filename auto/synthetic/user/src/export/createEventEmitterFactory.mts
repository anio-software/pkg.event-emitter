import {implementation} from "#~src/createEventEmitter.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv--- types needed for implementation
import type {_EmitEventType} from "#~src/export/_EmitEventType.d.mts"
import type {_EventsToNameTuple} from "#~src/_EventsToNameTuple.d.mts"
import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.d.mts"
import type {_EventsToObject} from "#~src/_EventsToObject.d.mts"
type EventEmitter<PossibleEvents extends {
	type: string;
}[]> = {
	on: OnType<PossibleEvents>;
	removeEventListener: RemoveEventListenerType<PossibleEvents>;
	_emitEvent: _EmitEventType<PossibleEvents>;
}
type Handler<PossibleEvents extends {
	type: string;
}[]> = {
	type: _EventsToNameUnion<PossibleEvents>;
	handler: (eventData: any) => undefined;
}
/* couldn't find a user defined type named 'Map' at the top level */
/* couldn't find a user defined type named 'Omit' at the top level */
import type {OnType} from "#~src/export/OnType.d.mts"
/* couldn't find a user defined type named 'PossibleEvents' at the top level */
import type {RemoveEventListenerType} from "#~src/export/RemoveEventListenerType.d.mts"
// ^^^--- types needed for implementation

declare function createEventEmitter<PossibleEvents extends {type: string}[]>(
	eventNames: _EventsToNameTuple<PossibleEvents>
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

	return function createEventEmitter<PossibleEvents extends {type: string}[]>(eventNames: _EventsToNameTuple<PossibleEvents>) : EventEmitter<PossibleEvents> {
		return implementation(local_context, eventNames)
	}
}
