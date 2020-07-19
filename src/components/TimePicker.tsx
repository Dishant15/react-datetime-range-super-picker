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


export default ({
	time, format=defaultConfigs.format,
	colors,
	onTimeUpdate
} : TimePickerProps) => {

	const curr_time = createInputTime(time)

	const handleTimeChange = useCallback((newTime : MainTime) => {
		const resTime = generateTimeOutput(newTime, format)
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
			{formatted}
		</div>
	)
}