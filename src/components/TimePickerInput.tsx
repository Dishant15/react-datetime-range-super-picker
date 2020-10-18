import React, { useState, useRef, useEffect } from 'react';

import TimePicker from "./TimePicker";

import { createInputTime, generateTimeOutput } from '../utils/timepicker.utils';
import { TimePickerInputProps, OutputTime, defaultConfigs } from '../interfaces/timepicker.interfaces';

import { useOutsideAlerter } from '../utils/useOutsideAlerter.hook'

import styles from '../styles/timepicker.css'


const TimePickerInput = (props:TimePickerInputProps) => {

	const wrapperRef = useRef(null);
	const [show_picker, setShow] = useState(false)
	const [showTime, setTime] = useState(
		// create initial string representaion to show in input
		generateTimeOutput(
			createInputTime(props.time), props.format || defaultConfigs.format
		).formatted
	)

	// update state if direct prop update
	useEffect(() => {
		setTime(
			generateTimeOutput(
				createInputTime(props.time), props.format || defaultConfigs.format
			).formatted
		)
	}, [props.time, props.format])


	const handleTimeUpdate = (timeObj:OutputTime) => {
		props.onTimeUpdate(timeObj)
		setTime(timeObj.formatted)
	}

	const handleComplete = () => {
		setShow(false)
		if(props.onDone) props.onDone()
	}

	useOutsideAlerter(wrapperRef, show_picker, () => setShow(false));

	return (
		<div className={[styles.picker_input_wrapper, props.className].join(' ')} >
			<input value={showTime} className={styles.picker_input} 
				readOnly disabled={props.isDisabled}
				style={{...props.inputStyle}}
				onFocus={() => setShow(true)} />

			{(show_picker && !props.isDisabled) &&
				<div className={[styles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
						<div ref={wrapperRef} className={styles.picker_model_inside} >
							<TimePicker time={props.time} format={props.format} 
								colors={props.colors}
								onTimeUpdate={handleTimeUpdate} onDone={handleComplete} />
						</div>
				</div>
			}
		</div>
	)
}

TimePickerInput.defaultProps = {
	isDisabled: false
}

export default TimePickerInput