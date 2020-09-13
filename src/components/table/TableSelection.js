export class TableSelection {
	static className = 'selected'
	constructor() {
		this.selectClass = 'selected'
		this.group = []
		this.current = null
	}

	select($el) {
		this.clearArr()
		this.group.push($el)
		$el.addClass(TableSelection.className)
		$el.focus()
		this.current = $el
	}

	clearArr() {
		this.group.forEach($el => $el.removeClass(TableSelection.className))
		this.group = []
	}

	get selectedIds() {
		return this.group.map($el => $el.id())
	}

	selectGroup($group = []) {
		this.clearArr()

		this.group = $group
		this.group.forEach($el => $el.addClass(TableSelection.className))
	}

	applyStyle(style) {
		this.group.forEach($el => $el.css(style))
	}
}
