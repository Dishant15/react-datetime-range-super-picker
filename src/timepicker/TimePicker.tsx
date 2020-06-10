import React, {useCallback} from "react";

import ClockFace from './ClockFace'

import { createInputTime, generateTimeOutput } from "./utils";

import { TimePickerProps, MainTime, defaultConfigs } from "./interfaces";

import styles from './timepicker.css'


export default ({
	time, format=defaultConfigs.format,
	colors,
	onTimeUpdate
} : TimePickerProps) => {
	console.log('c',colors)
	const curr_time = createInputTime(time)

	const handleTimeChange = useCallback((new_time : MainTime) => {
		const res_time = generateTimeOutput(new_time, format)
		onTimeUpdate(res_time)
	}, [])

	
	return(
		<div className={styles.wrapper} style={{}}>
			<TimeTitleWrapper {...curr_time} time_format={format} />

			<ClockFace {...curr_time} onTimeUpdate={handleTimeChange} />
		</div>
	)
}


interface TimeTitleWrapperProps extends MainTime {
	time_format : string
}

const TimeTitleWrapper = ({hour, minute, meridiem, time_format}:TimeTitleWrapperProps) => {

	const {formatted} = generateTimeOutput({hour, minute, meridiem}, time_format)

	return (
		<div className={styles.title}>
			{formatted}
		</div>
	)
}