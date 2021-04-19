import React, {useCallback} from "react";

import ClockFace from './ClockFace'

import { createInputTime, generateTimeOutput } from "../utils/timepicker.utils";

import { 
	TimeTitleWrapperProps,
	TimePickerProps,
	MainTime,
	defaultConfigs
} from "../interfaces/timepicker.interfaces";

import styles from '../styles/timepicker.css'
import { padStart } from "lodash";


export default ({
	time, format=defaultConfigs.format,
	colors,
	onTimeUpdate
} : TimePickerProps) => {
	const curr_time = createInputTime(time)

	const handleTimeChange = useCallback((newTime : MainTime) => {
		let resTime = generateTimeOutput(newTime, format)
		if(!resTime.formatted) {
			// formatted string is empty even after user clicked smt
			if(!isNaN(Number(resTime.time.minute))) {
				// @ts-ignore
				resTime.formatted = `00:${padStart(resTime.time.minute, 2, '0')} AM`
			}
			else if(!isNaN(Number(resTime.time.hour))) {
				// @ts-ignore
				resTime.formatted = `${padStart(resTime.time.hour, 2, '0')}:00 AM`
			}
		}
		onTimeUpdate(resTime)
	}, [])


	const wrapper_style = {
		background: colors.primary_color,
		color: colors.primary_font_color
	}

	return(
		<div className={styles.wrapper} style={wrapper_style}>

			<TimeTitleWrapper {...curr_time} 
				time_format={format}
				colors={colors}
			/>

			<ClockFace {...curr_time} 
				colors={colors}
				onTimeUpdate={handleTimeChange} />
		</div>
	)
}


const TimeTitleWrapper = ({hour, minute, meridiem, time_format, colors}:TimeTitleWrapperProps) => {

	const {formatted} = generateTimeOutput({hour, minute, meridiem}, time_format)

	return (
		<div className={styles.title} 
			style={{ color: colors.primary_highlight_color }}>
			{formatted || 'Select time'}
		</div>
	)
}