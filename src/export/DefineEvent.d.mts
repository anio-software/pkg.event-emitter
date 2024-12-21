export type DefineEvent<Name extends string, Data extends {}> = {
	type: Name
} & Data
