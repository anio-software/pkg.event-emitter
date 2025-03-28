import {
	createEventEmitterFactory
} from "../dist/default/index.min.mjs"
import {createContext} from "@fourtune/realm-js/v0/runtime"

const createEventEmitter = createEventEmitterFactory(
	createContext({
		shouldLog() {
			return true
		}
	})
)

const {on, removeEventListener, _emitEvent} = createEventEmitter([
	"event1"
])

const listener = on("event1", (e) => {
	console.log(e)
})

_emitEvent("event1", {})

if (listener) removeEventListener(listener)
