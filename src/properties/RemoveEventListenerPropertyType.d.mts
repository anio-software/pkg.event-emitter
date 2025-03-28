import type {Event} from "#~src/export/Event.d.mts"

export type RemoveEventListenerPropertyType<Events extends Event[]> = (
	listener: number
) => undefined
