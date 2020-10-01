import { useState, useCallback } from "react"
import { isEmpty } from "lodash";


const generatePickerHtml = ({format, isInput,
	theme, colors, isDisabled}) => {
	const componentStr = isInput ? 'TimePickerInput' : 'TimePicker'

	let propStr = `time={{hour24 : hour, minute }}
				onTimeUpdate={handleTimeUpdate}`
	
	if(!!format) {
		propStr += `\n\t\t\t\tformat="${format}"`
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

	return `
	import React, { useState } from 'react';
	import { ${componentStr} } from 'react-datetime-range-super-picker';

	import 'react-datetime-range-super-picker/dist/index.css'

	const TimePickerComponent = () => {
		const [hour, setHour] = useState(22)
		const [minute, setMin] = useState(30)

		const handleTimeUpdate = ({time}) => {
			setHour(time.hour24)
			setMin(time.minute)
		}

		return (
			<${componentStr} ${propStr} />
		)
	}
	`
}

export const useTimePickerProps = () => {
	
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