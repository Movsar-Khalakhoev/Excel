import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
		this.emitter = options.emitter
		this.unsubscribers = []

		this.prepare()
	}

	// Настраиваем наш компонент до init()
	prepare() {

	}

	// Возвращает шаблок компонента
	toHTML() {
		return ''
	}

	// Уведомляем слушателей про собтие event
	$emit(eventName, ...args) {
		this.emitter.emit(eventName, ...args)
	}

	// Подписываемся на событие event
	$on(eventName, fn) {
		const unsub = this.emitter.subscribe(eventName, fn)
		this.unsubscribers.push(unsub)
	}

	// Инициализируем компонтент
	init() {
		this.initDOMListeners()
	}

	// Удаляем компонетнт и чистим слушатели
	destroy() {
		this.removeDOMListeners()
		this.unsubscribers.forEach(unsub => unsub())
	}
}
