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
	"d"
])

on("d", (e) => {
	console.log(e)
})

_emitEvent("d", {})

removeEventListener(0)
