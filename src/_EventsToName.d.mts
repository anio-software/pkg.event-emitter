/**
 * Converts a typed array like:
 * 
 * [{type: "a"}, {type: "b"}]
 * 
 * Into a type array:
 * 
 * ["a", "b"]
 */
export type _EventsToName<PossibleEvents extends { type: string }[]> = 
	PossibleEvents extends [infer First, ...infer Rest] ? (
		First extends { type: infer U } ? (
			Rest extends {type:string}[] ? [U, ..._EventsToName<Rest>] : never
		) : never
	): []
