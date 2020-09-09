import {$} from '@core/dom'

function resizerFunc($resizer,
										$table,
										type) {
	let direction
	type == 'col' ? direction = 'width' : direction = 'height'
	const $resizerSize = +getComputedStyle($resizer.$el)[direction][0]

	$resizer.css({
		opacity: 1,
		zIndex: 1000,
	})
	type == 'row' ?
		$resizer.css({width: `${$table.scrollWidth}px`}) :
		$resizer.css({height: `${$table.scrollHeight}px`})

	return $resizerSize
}

function mousemoveFunc($resizer, $table, context, coords, type) {
	const $resizerSize = resizerFunc($resizer, $table, type)
	let direction
	let delta

	if (type == 'col') {
		direction = 'width'
		delta = context.pageX - coords.right + $resizerSize

		$resizer.css({
			right: `${-delta}px`,
			height: `${$table.scrollHeight}px`
		})
	} else {
		direction = 'height'
		delta = context.pageY - coords.bottom + $resizerSize

		$resizer.css({bottom: `${-delta - window.scrollY}px`})
	}

	return coords[direction] + delta
}

export function mousedownFunc($root, event) {
	const $resizer = $(event.target)
	const $parent = $resizer.closest('[data-type="resizable"]')
	const $type = $resizer.data.resize
	const $body = $('body')
	const coords = $parent.getCoords()
	let value

	$body.css({cursor: `${$type == 'col' ? 'col-resize': 'row-resize'}`})

	resizerFunc($resizer, $root.$el, $type)

	document.onmousemove = e => {
		value = mousemoveFunc($resizer, $root.$el, e, coords, $type)
	}

	document.onmouseup = e => {
		document.onmousemove = null
		document.onmouseup = null
		$type == 'col' ?
			$root
			.findAll(`[data-col="${$parent.data.col}"]`)
			.forEach(el => el.style.width = `${value}px`) :
		$parent.css({height: `${value}px`})

		$resizer.css()
		$body.css()
	}
}
