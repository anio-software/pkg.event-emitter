import type {Event} from "#~export/Event.ts"
import type {EventListener} from "#~export/EventListener.ts"

export type RemoveEventListenerPropertyType<Events extends Event[]> = (
	listener: EventListener
) => undefined
