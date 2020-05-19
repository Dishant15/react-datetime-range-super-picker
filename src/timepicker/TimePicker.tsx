import React, {useState, useCallback} from "react";

import ClockFace from './ClockFace'

import { createInputTime, generateTimeOutput } from "./utils";

import { TimePickerProps, MainTime } from "./interfaces";

import styles from './timepicker.css'


export default ({time, format='hh:mm aaa', onTimeUpdate} : TimePickerProps) => {

	const [curr_time, setTime] = useState(createInputTime(time))

	const handleTimeChange = useCallback((new_time : MainTime) => {
		const res_time = generateTimeOutput(new_time, format)
		onTimeUpdate(res_time)
		setTime(new_time)
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