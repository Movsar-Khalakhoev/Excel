import {capitalize} from '@core/utils'

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('No $root provided for DomListener!')
		}
		this.$root = $root
		this.listeners = listeners
	}

	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = `on${capitalize(listener)}`
			if (!this[method]) {
				throw new Error(
					`Method ${method} is not implemented in ${this.name} Component`
					)
			}
			// То же самое, что и addEventListener
			this[method] = this[method].bind(this)
			this.$root.on(listener, this[method])
		})
	}

	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = `on${capitalize(listener)}`
			this.$root.off(listener, this[method])
		})
	}
}
