import React, { useState, useRef, useEffect, useCallback } from 'react';

import TimePicker from "./TimePicker";

import { createInputTime, generateTimeOutput } from '../utils/timepicker.utils';
import { TimePickerInputProps, OutputTime, defaultConfigs } from '../interfaces/timepicker.interfaces';

import { useOutsideAlerter } from '../utils/useOutsideAlerter.hook'

import styles from '../styles/timepicker.css'
import rootstyles from "../styles/root.css";


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

	const handleShow = useCallback(() => {
		setShow(true)
	},[])

	const handleComplete = useCallback(() => {
		setShow(false)
		if(props.onDone) props.onDone()
	}, [])

	useOutsideAlerter(wrapperRef, setShow);

	const inputComponentProps = {
		value: showTime,
		readOnly: true,
		disabled: props.isDisabled,
		onFocus: handleShow
	}

	const inputComponent = React.isValidElement(props.inputComponent) ?
		React.cloneElement(props.inputComponent, inputComponentProps)
		:
		<input className={styles.picker_input} style={{...props.inputStyle}} {...inputComponentProps} />

	return (
		<div ref={wrapperRef} className={[styles.picker_input_wrapper, props.className].join(' ')} >
			
			{inputComponent}

			{(show_picker && !props.isDisabled) &&
				<div className={[rootstyles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
						<div className={rootstyles.picker_model_inside} >
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