/**
 * Maps a union of objects:
 * 
 * {type: "eventName1", eventDataProp1: string} |
 * {type: "eventName2", eventDataProp2: string}
 * 
 * Into an object:
 * 
 * {
 *     "eventName1": {
 *         "eventDataProp1": string
 *     },
 *     "eventName2": {
 *         "eventDataProp2": string
 *     }
 * }
 * 
 */
export type _EventsToMap<
	PossibleEvents extends {type: string}
> = {[K in PossibleEvents as K["type"]]: K}
