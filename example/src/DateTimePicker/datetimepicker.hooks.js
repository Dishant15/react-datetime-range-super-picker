import { useState, useCallback } from "react"
import { isEmpty } from "lodash";


const generatePickerHtml = ({format, timeFormat, dateFormat, weekStartsOn,
	isInput, theme, colors}) => {
	const componentStr = isInput ? 'DateTimePickerInput' : 'DateTimePicker'

	let propStr = `date={curr_date}
				onDateTimeUpdate={handleDateUpdate}`
	
	if(!!format) {
		propStr += `\n\t\t\t\tformat="${format}"`
	}

	if(!!timeFormat) {
		propStr += `\n\t\t\t\ttimeFormat="${timeFormat}"`
	}

	if(!!dateFormat) {
		propStr += `\n\t\t\t\tdateFormat="${dateFormat}"`
	}

	if(!!weekStartsOn) {
		propStr += `\n\t\t\t\tweekStartsOn={${weekStartsOn}}`
	}

	if(!!theme) {
		propStr += `\n\t\t\t\ttheme="${theme}"`
	}

	if(!isEmpty(colors)) {
		propStr += `\n\t\t\t\tcolors=${JSON.stringify(colors)}`
	}

	return `
	import React, { useState } from 'react';
	import { ${componentStr} } from 'react-datetime-range-super-picker';

	const DateTimePickerComponent = () => {
		const [curr_date, setDate] = useState(new Date())

		const handleDateUpdate = ({date}) => {
			setDate(date.date)
		}

		return (
			<${componentStr} ${propStr} />
		)
	}
	`
}

export const useDateTimePickerProps = () => {
	
	const [isInput, setInput] = useState(false)
	const [pickerProps, setPickerProps] = useState({})
	const [pickerHtml, setPickerHtml] = useState(generatePickerHtml({}))

	const handlePropsUpdate = useCallback((newProps) => {
		setPickerProps(newProps)
		setPickerHtml(generatePickerHtml({...newProps, isInput}))
	}, [isInput])

	const handleToggleInput = useCallback((isInput) => {
		setInput(isInput)
		setPickerHtml(generatePickerHtml({...pickerProps, isInput}))
	}, [pickerProps])

	return [pickerProps, pickerHtml, handlePropsUpdate, isInput, handleToggleInput]
}