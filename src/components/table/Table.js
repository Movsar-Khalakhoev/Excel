import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {mousedownFunc} from '@/components/table/table.resize'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
		super($root, {
			listeners: ['mousedown']
		})
	}

	toHTML() {
		return createTable()
	}

	onMousedown(event) {
		mousedownFunc(this.$root, event)
	}
}
