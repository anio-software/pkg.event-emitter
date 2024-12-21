/**
 * Converts a typed array like:
 * 
 * [{type: "a"}, {type: "b", prop: string}, {type: "c", anotherProp: string}]
 * 
 * Into a type object:
 * 
 * {
 *     "a": {
 *         "type": "a"
 *     },
 * 
 *     "b": {
 *         "type": "b"
 *         "prop": string
 *     },
 * 
 *     "c": {
 *         "type": "c"
 *         "anotherProp": string
 *     }
 * }
 */
export type _EventsToObject<PossibleEvents extends {type: string}[]> = {
	[K in PossibleEvents[number] as K["type"]]: K
}
