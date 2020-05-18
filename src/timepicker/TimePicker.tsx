import React, {useState, useCallback} from "react";

import { createInputTime, generateTimeOutput } from "./utils";

import { TimePickerProps, MainTime } from "./interfaces";


export default ({time, format, onTimeUpdate} : TimePickerProps) => {

	const [curr_time, setTime] = useState(createInputTime(time))

	const handleTimeChange = useCallback((new_time : MainTime) => {
		const res_time = generateTimeOutput(new_time, format)
		onTimeUpdate(res_time)
		setTime(new_time)
	}, [])

	
	return(
		<div onClick={() => handleTimeChange(curr_time)}>{curr_time.hour} : {curr_time.minute} {curr_time.meridiem}</div>
	)
}