import React, { useState } from 'react';

import TimePicker from "./TimePicker";

import { createInputTime, generateTimeOutput } from '../utils/timepicker.utils';
import { TimePickerInputProps, OutputTime, defaultConfigs } from '../interfaces/timepicker.interfaces';

import styles from '../styles/datepicker.css'


export default (props:TimePickerInputProps) => {

	const [show_picker, setShow] = useState(false)
	const [showTime, setTime] = useState(
		// create initial string representaion to show in input
		generateTimeOutput(
			createInputTime(props.time), props.format || defaultConfigs.format
		).formatted
	)

	const handleTimeUpdate = (timeObj:OutputTime) => {
		props.onTimeUpdate(timeObj)
		setTime(timeObj.formatted)
	}

	const handleComplete = () => {
		setShow(false)
		if(props.onDone) props.onDone()
	}

	return (
		<div className={[styles.picker_input_wrapper, props.className].join(' ')} >
			<input value={showTime} className={styles.picker_input} readOnly
				style={{...props.inputStyle}}
				onFocus={() => setShow(true)} />

			{show_picker &&
				<div className={[styles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
						<div className={styles.picker_model_inside} >
							<TimePicker time={props.time} format={props.format} 
								colors={props.colors}
								onTimeUpdate={handleTimeUpdate} onDone={handleComplete} />
						</div>
				</div>
			}
		</div>
	)
}