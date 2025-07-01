export type ExtractEventsFromCompoundType<T> = T extends {
	__ignoreThisPropertyAnioJSEvents?: infer X
} ? NonNullable<X> : never
