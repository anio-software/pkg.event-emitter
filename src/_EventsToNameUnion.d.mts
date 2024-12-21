/**
 * Converts a typed array like:
 * 
 * [{type: "a"}, {type: "b"}]
 * 
 * Into a union:
 * 
 * "a" | "b"
 */
export type _EventsToNameUnion<PossibleEvents extends { type: string }[]> = PossibleEvents[number]["type"]
