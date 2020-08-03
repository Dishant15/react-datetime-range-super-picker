import { useState, useCallback } from "react"
import { isEmpty } from "lodash";


const generatePickerHtml = ({theme, colors}) => {

	let propStr = `time={{month: res_month, year:res_year}}
				onDateUpdate={handleDateUpdate}`

	if(!!theme) {
		propStr += `\n\t\t\t\ttheme="${theme}"`
	}

	if(!isEmpty(colors)) {
		propStr += `\n\t\t\t\tcolors=${JSON.stringify(colors)}`
	}

	return `
	import React, { useState } from 'react';
	import { MonthPicker } from 'react-datetime-range-super-picker';

	const MonthPickerComponent = () => {
		const [res_month, setMonth] = useState(4)
  		const [res_year, setYear] = useState(2020)

		const handleDateUpdate = ({ month, year }) => {
			setMonth(month)
			setYear(year)
		}

		return (
			<MonthPicker ${propStr} />
		)
	}
	`
}

export const useMonthPickerProps = () => {
	
	const [pickerProps, setPickerProps] = useState({})
	const [pickerHtml, setPickerHtml] = useState(generatePickerHtml({}))

	const handlePropsUpdate = useCallback((newProps) => {
		setPickerProps(newProps)
		setPickerHtml(generatePickerHtml({...newProps}))
	}, [])

	return [pickerProps, pickerHtml, handlePropsUpdate]
}