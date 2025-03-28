import {implementation} from "#~src/createEventEmitter.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv--- types needed for implementation
import type {_EventsToNameTuple} from "#~src/_EventsToNameTuple.d.mts"
import type {Event} from "#~src/export/Event.d.mts"
import type {EventEmitter} from "#~src/export/EventEmitter.d.mts"
type EventHandler = (data: object, event: Event) => undefined
import type {EventListener} from "#~src/export/EventListener.d.mts"
/* couldn't find a user defined type named 'Map' at the top level */
// ^^^--- types needed for implementation

declare function createEventEmitter<Events extends Event[]>(
	eventNames: _EventsToNameTuple<Events>
) : EventEmitter<Events, true>

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

	return function createEventEmitter<Events extends Event[]>(eventNames: _EventsToNameTuple<Events>) : EventEmitter<Events, true> {
		return implementation(local_context, eventNames)
	}
}
