export type DefineEvent<
	Name extends string,
	Data extends object = {}
> = {
	type: Name
} & Data
