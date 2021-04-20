import React, { useState, useEffect, useRef, useCallback } from 'react';

import DatePicker from './DatePicker'

import { getInitialDateForInput } from '../utils/datepicker.utils';
import { DatePickerInputProps, DatePickerOutPut } from "../interfaces/datepicker.interfaces";

import { useOutsideAlerter } from '../utils/useOutsideAlerter.hook'

import styles from '../styles/datepicker.css'
import rootstyles from "../styles/root.css";


const DatePickerInput = (props:DatePickerInputProps) => {

	const {date, format, isDisabled} = props

	const wrapperRef = useRef(null);

	const [show_picker, setShow] = useState(false)
	const [show_date, setDate] = useState(
		getInitialDateForInput(date, format)
	)

	// update state if direct prop update
	useEffect(() => {
		setDate(getInitialDateForInput(date, format))
	}, [date, format])

	const handleDateUpdate = (date_obj:DatePickerOutPut) => {
		props.onDateUpdate(date_obj)
		setDate(date_obj.formatted)
	}

	const handleShow = useCallback(() => {
		setShow(true)
	},[])

	const handleComplete = useCallback(() => {
		setShow(false)
		if(props.onComplete) props.onComplete()
	}, [])

	useOutsideAlerter(wrapperRef, setShow);

	const inputComponentProps = {
		value: show_date || '',
		readOnly: true,
		disabled: props.isDisabled,
		onFocus: handleShow
	}

	const inputComponent = React.isValidElement(props.inputComponent) ?
		React.cloneElement(props.inputComponent, inputComponentProps)
		:
		<input className={styles.picker_input} style={{...props.inputStyle}} 
			placeholder='Click to select date'
			{...inputComponentProps} />

	
	return (
		<div ref={wrapperRef} className={[styles.picker_input_wrapper, props.className].join(' ')} >
			
			{inputComponent}

			{(show_picker && !isDisabled) &&
				<div className={[rootstyles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
						<div className={rootstyles.picker_model_inside} >
							<DatePicker date={props.date} format={props.format} 
								weekStartsOn={props.weekStartsOn} colors={props.colors}
								onDateUpdate={handleDateUpdate} onComplete={handleComplete} />
						</div>
				</div>
			}
		</div>
	)
}

DatePickerInput.defaultProps = {
	isDisabled: false
}

export default DatePickerInput