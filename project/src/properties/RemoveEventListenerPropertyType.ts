import type {Event} from "#~src/export/Event.ts"
import type {EventListener} from "#~src/export/EventListener.ts"

export type RemoveEventListenerPropertyType<Events extends Event[]> = (
	listener: EventListener
) => undefined
