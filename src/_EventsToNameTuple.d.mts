/**
 * Converts a typed array like:
 * 
 * [{type: "a"}, {type: "b"}]
 * 
 * Into a type array:
 * 
 * ["a", "b"]
 */
export type _EventsToNameTuple<PossibleEvents extends { type: string }[]> = 
	PossibleEvents extends [infer First, ...infer Rest] ? (
		First extends { type: infer U } ? (
			Rest extends {type:string}[] ? [U, ..._EventsToNameTuple<Rest>] : never
		) : never
	): []
