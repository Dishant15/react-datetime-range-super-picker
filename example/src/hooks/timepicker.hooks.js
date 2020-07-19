import { useState, useCallback } from "react"

const generatePickerHtml = ({format}) => {
	let propStr = `time={{hour24 : hour, minute }}
				onTimeUpdate={handleTimeUpdate}`
	
	if(!!format) {
		propStr += `\n\t\t\t\tformat="${format}"`
	}

	return `
	import React, { useState } from 'react';
	import { TimePicker, TimePickerInput } from 'react-datetime-range-super-picker';

	const TimePickerComponent = () => {
		const [hour, setHour] = useState(22)
		const [minute, setMin] = useState(30)

		const handleTimeUpdate = ({time}) => {
			setHour(time.hour24)
			setMin(time.minute)
		}

		return (
			<TimePickerInput ${propStr} />
		)
	}
	`
}

export const useTimePickerProps = () => {
	
	const [pickerProps, setPickerProps] = useState({})
	const [pickerHtml, setPickerHtml] = useState(generatePickerHtml({}))

	const handlePropsUpdate = useCallback((newProps) => {
		setPickerProps(newProps)
		setPickerHtml(generatePickerHtml(newProps))
	}, [])

	return [pickerProps, pickerHtml, handlePropsUpdate]
}