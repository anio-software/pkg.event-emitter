import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import type {_EventsToMap} from "#~src/_EventsToMap.d.mts"

type EventEmitter<PossibleEvents extends {type: string}> = {
	on: <E extends keyof _EventsToMap<PossibleEvents>>(
		eventName: E,
		listener: (data: _EventsToMap<PossibleEvents>[E]) => undefined
	) => number

	removeEventListener: (eventHandlerId: number) => undefined

	_emitEvent: <E extends keyof _EventsToMap<PossibleEvents>>(
		eventName: E,
		eventData: Omit<_EventsToMap<PossibleEvents>[E], "type">
	) => undefined
}

type Handler<PossibleEvents extends {type: string}> = {
	type: keyof _EventsToMap<PossibleEvents>
	handler: (eventData: any) => undefined
}

export function implementation<
	PossibleEvents extends {type: string}
>(
	wrapped_context: RuntimeWrappedContextInstance,
	eventNames: (keyof _EventsToMap<PossibleEvents>)[]
) : EventEmitter<PossibleEvents> {
	const context = useContext(wrapped_context, 0)

	let handlers : Map<number, Handler<PossibleEvents>> = new Map()
	let currentHandlerId = -1

	const eventNamesQuoted = eventNames.map(x => `'${x.toString()}'`)

	if (!eventNames.length) {
		context.log.warn(
			`initializing EventEmitter with empty event name array!`
		)
	} else {
		context.log.silly(
			`initializing event emitter with events ${eventNamesQuoted.join(", ")}`
		)
	}

	function checkEventName(eventName: string) : boolean {
		if (!eventNames.includes(eventName)) {
			context.log.error(
				`invalid event name '${eventName.toString()}'.`
			)

			return false
		}

		return true
	}

	const on = <E extends keyof _EventsToMap<PossibleEvents>>(
		eventName: E,
		listener: (data: _EventsToMap<PossibleEvents>[E]) => undefined
	) : number => {
		if (!checkEventName(eventName as string)) return -1

		++currentHandlerId

		handlers.set(currentHandlerId, {
			type: eventName,
			handler: listener
		})

		context.log.silly(
			`add event listener for '${eventName.toString()}' that has the id '${currentHandlerId}'.`,
			`number of installed event handlers is now '${handlers.size}'.`
		)

		return currentHandlerId
	}

	const removeEventListener = (eventHandlerId: number) : undefined => {
		if (!handlers.has(eventHandlerId)) {
			context.log.error(
				`don't have an event listener with id '${eventHandlerId}'.`
			)

			return
		}

		const handler = handlers.get(eventHandlerId)!

		handlers.delete(eventHandlerId)

		context.log.silly(
			`removed event listener '${handler.type.toString()}' that had the id '${eventHandlerId}'.`,
			`number of installed event handlers is now '${handlers.size}'.`
		)
	}

	const _emitEvent = <E extends keyof _EventsToMap<PossibleEvents>>(
		eventName: E,
		eventData: Omit<_EventsToMap<PossibleEvents>[E], "type">
	) : undefined => {
		if (!checkEventName(eventName as string)) return

		let handlersToCall : ((data: any) => undefined)[] = []

		for (const [key, value] of handlers.entries()) {
			if (value.type === eventName) {
				handlersToCall.push(value.handler)
			}
		}

		context.log.trace(
			`dispatching '${eventName.toString()}' to ${handlersToCall.length} listeners.`
		)

		const data = {...eventData, type: eventName}

		setTimeout(() => {
			for (const handler of handlersToCall) {
				handler(data)
			}
		}, 0)
	}

	return {on, removeEventListener, _emitEvent}
}
