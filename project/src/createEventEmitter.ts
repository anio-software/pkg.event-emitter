import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import type {Event} from "#~export/Event.ts"
import type {_EventsToNameTuple} from "#~src/_EventsToNameTuple.ts"
import type {_EventsToNameUnion} from "#~src/_EventsToNameUnion.ts"
import type {EventEmitter} from "#~export/EventEmitter.ts"
import type {EventListener} from "#~export/EventListener.ts"

type EventHandler = (
	data: object,
	event: Event
) => undefined

export function implementation<Events extends Event[]>(
	contextOptions: EnkoreJSRuntimeContextOptions,
	eventNames: _EventsToNameTuple<Events>
) : EventEmitter<Events, true> {
	const context = createContext(contextOptions, 0)

	const handlers : Map<number, {
		associatedEventName: string
		handler: unknown
	}> = new Map()

	//
	// starting a 0 makes this construct possible:
	// const handler = emitter.on("event", () => {})
	// if (handler) emitter.removeEventListener(handler)
	//
	// starting at -1 would result in if (handler) to return false
	let currentHandlerId = 0

	const eventNamesQuoted = eventNames.map(x => `'${x.toString()}'`)

	if (!eventNames.length) {
		context.log.warn(
			`initializing EventEmitter with empty event name array!`
		)
	} else {
		context.log.trace(
			`initializing event emitter with events ${eventNamesQuoted.join(", ")}`
		)
	}

	return {
		on(eventName, handler) {
			if (!checkEventName(eventName)) {
				return false
			}

			++currentHandlerId

			handlers.set(currentHandlerId, {
				associatedEventName: eventName,
				handler
			})

			context.log.trace(
				`add event listener for '${eventName.toString()}' that has the id '${currentHandlerId}'.`,
				`number of installed event handlers is now '${handlers.size}'.`
			)

			return currentHandlerId as EventListener
		},

		removeEventListener(eventHandlerId) {
			if (!handlers.has(eventHandlerId)) {
				context.log.error(
					`don't have an event listener with id '${eventHandlerId}'.`
				)

				return
			}

			const handler = handlers.get(eventHandlerId)!

			handlers.delete(eventHandlerId)

			context.log.trace(
				`removed event listener '${handler.associatedEventName.toString()}' that had the id '${eventHandlerId}'.`,
				`number of installed event handlers is now '${handlers.size}'.`
			)
		},

		_emitEvent(eventName, eventUserData, additionalData) {
			if (!checkEventName(eventName)) {
				return false
			}

			const handlersToCall = getEventHandlers(eventName)

			context.log.trace(
				`dispatching '${eventName.toString()}' to ${handlersToCall.length} listeners.`
			)

			for (const handler of handlersToCall) {
				handler(eventUserData, {
					eventName,
					eventUserData,
					eventData: {
						source: additionalData?.source
					}
				})
			}

			return handlersToCall.length
		}
	}

	function checkEventName(eventName: string) : boolean {
		if (!(eventNames as string[]).includes(eventName)) {
			context.log.error(
				`invalid event name '${eventName.toString()}'.`
			)

			return false
		}

		return true
	}

	function getEventHandlers(eventName: string): EventHandler[] {
		const ret: EventHandler[] = []

		for (const [_, value] of handlers.entries()) {
			if (value.associatedEventName === eventName) {
				ret.push(value.handler as EventHandler)
			}
		}

		return ret
	}
}
