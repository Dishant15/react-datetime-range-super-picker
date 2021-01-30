import { useState, useCallback } from "react"
import { isEmpty } from "lodash";


const generatePickerHtml = ({format, weekStartsOn, isInput,
	theme, colors, isDisabled}) => {
	const componentStr = isInput ? 'DatePickerInput' : 'DatePicker'

	let propStr = `date={curr_date}
				onDateUpdate={handleDateUpdate}`
	
	if(!!format) {
		propStr += `\n\t\t\t\tformat="${format}"`
	}

	if(!!theme) {
		propStr += `\n\t\t\t\ttheme="${theme}"`
	}

	if(!!weekStartsOn) {
		propStr += `\n\t\t\t\tweekStartsOn={${weekStartsOn}}`
	}

	if(!isEmpty(colors)) {
		propStr += `\n\t\t\t\tcolors={${JSON.stringify(colors)}}`
	}

	if(!!isDisabled && isInput) {
		propStr += `\n\t\t\t\t\isDisabled={${isDisabled}}` //eslint-disable-line
	}

	return `
	import React, { useState } from 'react';
	import { ${componentStr} } from 'react-datetime-range-super-picker';

	import 'react-datetime-range-super-picker/dist/index.css'

	const DatePickerComponent = () => {
		const [curr_date, setDate] = useState(new Date())

		const handleDateUpdate = ({date}) => {
			setDate(date)
		}

		return (
			<${componentStr} ${propStr} />
		)
	}
	`
}

export const useDatePickerProps = () => {
	
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