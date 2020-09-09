export class Emitter {
	constructor() {
		this.listeners = {}
	}

	// Уведомляем слушателей, если они есть
	emit(eventName, ...args) {
		if (!Array.isArray(this.listeners[eventName])) {
			return false
		}
		this.listeners[eventName].forEach(listener => {
			listener(...args)
		})
		return true
	}

	// Подписываетмя на уведомление; добавляем нового слушателя
	subscribe(eventName, fn) {
		this.listeners[eventName] = this.listeners[eventName] || []
		this.listeners[eventName].push(fn)

		return () => {
			this.listeners[eventName] =
			this.listeners[eventName]
			.filter(listener => listener !== fn)
		}
	}
}
