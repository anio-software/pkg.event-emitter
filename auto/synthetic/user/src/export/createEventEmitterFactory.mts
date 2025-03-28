import {implementation} from "#~src/createEventEmitter.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv--- types needed for implementation
import type {_EventsToNameTuple} from "#~src/_EventsToNameTuple.d.mts"
import type {Event} from "#~src/export/Event.d.mts"
type EventEmitter<Events extends Event[]> = EventEmitterPublic<Events> & {
	_emitEvent: PropertyTypeOf<"_emitEvent", Events>;
}
import type {EventEmitter as EventEmitterPublic} from "#~src/export/EventEmitter.d.mts"
/* couldn't find a user defined type named 'Events' at the top level */
import type {PropertyTypeOf} from "#~src/export/PropertyTypeOf.d.mts"
// ^^^--- types needed for implementation

declare function createEventEmitter<Events extends Event[]>(
	eventNames: _EventsToNameTuple<Events>
) : EventEmitter<Events>

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

	return function createEventEmitter<Events extends Event[]>(eventNames: _EventsToNameTuple<Events>) : EventEmitter<Events> {
		return implementation(local_context, eventNames)
	}
}
