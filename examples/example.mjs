import {
	createEventEmitterFactory
} from "../products/project/dist/default/index.min.mjs"
import {defineContextOptions} from "@anio-software/enkore.js-runtime"
import {getProject} from "@anio-software/enkore.target-js-none/project"

const createEventEmitter = createEventEmitterFactory(
	defineContextOptions({
		project: getProject(),
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
