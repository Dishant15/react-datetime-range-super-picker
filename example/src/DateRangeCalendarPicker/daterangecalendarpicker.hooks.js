import { useState, useCallback } from "react"
import { isEmpty } from "lodash";


const generatePickerHtml = ({format, weekStartsOn,
	theme, colors, closeButtonText, isInput, isDisabled}) => {
		
	const componentStr = isInput ? 'DateRangeCalendarPickerInput' : 'DateRangeCalendarPicker'

	let propStr = `from_date={from_date} to_date={to_date}
				onFromDateUpdate={handleFromDateUpdate} 
				onToDateUpdate={handleToDateUpdate}`
	
	if(!!format) {
		propStr += `\n\t\t\t\tformat="${format}"`
	}

	if(!!weekStartsOn) {
		propStr += `\n\t\t\t\tweekStartsOn={${weekStartsOn}}`
	}

	if(!!closeButtonText) {
		propStr += `\n\t\t\t\t\closeButtonText="${closeButtonText}"` //eslint-disable-line
	}

	if(!!theme) {
		propStr += `\n\t\t\t\ttheme="${theme}"`
	}

	if(!isEmpty(colors)) {
		propStr += `\n\t\t\t\tcolors={${JSON.stringify(colors)}}`
	}

	if(!!isDisabled) {
		propStr += `\n\t\t\t\t\isDisabled={${isDisabled}}` //eslint-disable-line
	}


	return `
	import React, { useState } from 'react';
	import { ${componentStr} } from 'react-datetime-range-super-picker';

	import 'react-datetime-range-super-picker/dist/index.css'

	const DateRangeCalendarPickerComponent = () => {
		const [from_date, setFromDate] = useState(new Date())
		const [to_date, setToDate] = useState(new Date())

		const handleFromDateUpdate = ({date}) => {
			setFromDate(date)
		}

		const handleToDateUpdate = ({date}) => {
			setToDate(date)
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