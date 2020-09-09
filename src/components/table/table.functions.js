import {range} from '@core/utils'

export function shouldResize(event) {
	return event.target.dataset.resize
}

export function isCell(event) {
	return event.target.dataset.type == 'cell'
}

export function matrix($target, $current) {
	const target = $target.id(true)
	const current = $current.id(true)

	const cols = range(current.col, target.col)
	const rows = range(current.row, target.row)

	return cols.reduce((acc, col) => {
		rows.forEach(row => acc.push(`${row}:${col}`))
		return acc
	}, [])
}

export function nextSelector(key, {col, row}) {
	const MIN_VALUE = 0
	switch (key) {
		case 'Enter':
			break
		case 'Tab':
			break
		case 'ArrowDown':
			row++
			break
		case 'ArrowUp':
			if (row > MIN_VALUE) {
				row--
			}
			break
		case 'ArrowLeft':
			if (col > MIN_VALUE) {
				col--
			}
			break
		case 'ArrowRight':
			col++
			break
	}

	return `[data-id="${row}:${col}"]`
}
