export type ExtractEventsFromCompoundType<T> = T extends {
	__ignoreThisPropertyAnioJSPossibleEvents?: infer X
} ? NonNullable<X> : never
