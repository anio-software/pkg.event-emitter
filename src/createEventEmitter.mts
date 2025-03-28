import {useContext, type RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

export function implementation(
	wrapped_context: RuntimeWrappedContextInstance,
	eventNames: string[]//_EventsToNameTuple<PossibleEvents>
) : any {
	const context = useContext(wrapped_context, 0)
}
