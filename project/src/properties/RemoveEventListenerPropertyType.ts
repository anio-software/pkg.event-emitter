import type {Event} from "#~src/export/Event.d.mts"
import type {EventListener} from "#~src/export/EventListener.d.mts"

export type RemoveEventListenerPropertyType<Events extends Event[]> = (
	listener: EventListener
) => undefined
