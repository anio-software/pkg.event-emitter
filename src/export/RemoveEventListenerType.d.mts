export type RemoveEventListenerType<PossibleEvents extends {type: string}[]> = (
	listener: number
) => undefined
