import { useState, useCallback } from "react"
import { isEmpty } from "lodash";


const generatePickerHtml = ({format, timeFormat, 
	dateFormat, weekStartsOn, showRangeTrace = true,
	isInput, theme, colors, closeButtonText, isDisabled}) => {
		
	const componentStr = isInput ? 'DateTimePickerInput' : 'DateTimeRangePicker'

	let propStr = `from_date={from_date} to_date={to_date}
				onFromDateTimeUpdate={handleFromDateUpdate} 
				onToDateTimeUpdate={handleToDateUpdate}`
	
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

	if(!!closeButtonText) {
		propStr += `\n\t\t\t\t\closeButtonText="${closeButtonText}"`
	}

	if(!!theme) {
		propStr += `\n\t\t\t\ttheme="${theme}"`
	}

	if(!isEmpty(colors)) {
		propStr += `\n\t\t\t\tcolors={${JSON.stringify(colors)}}`
	}

	if(!!isDisabled && isInput) {
		propStr += `\n\t\t\t\t\isDisabled={${isDisabled}}`
	}

	propStr += `\n\t\t\t\t\showRangeTrace={${showRangeTrace}}`

	return `
	import React, { useState } from 'react';
	import { ${componentStr} } from 'react-datetime-range-super-picker';

	import 'react-datetime-range-super-picker/dist/index.css'

	const DateTimeRangePickerComponent = () => {
		const [from_date, setFromDate] = useState(new Date())
		const [to_date, setToDate] = useState(new Date())

		const handleFromDateUpdate = ({date}) => {
			setFromDate(date.date)
		}

		const handleToDateUpdate = ({date}) => {
			setToDate(date.date)
		}

		return (
			<${componentStr} ${propStr} />
		)
	}
	`
}

export const useRangePickerProps = () => {
	
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