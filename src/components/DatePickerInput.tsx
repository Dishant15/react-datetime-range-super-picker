import React, { useState, useEffect, useRef } from 'react';

import DatePicker from './DatePicker'

import { getInitialDateForInput } from '../utils/datepicker.utils';
import { DatePickerInputProps, DatePickerOutPut } from "../interfaces/datepicker.interfaces";

import { useOutsideAlerter } from '../utils/useOutsideAlerter.hook'

import styles from '../styles/datepicker.css'


export default (props:DatePickerInputProps) => {

	const {date, format} = props

	const wrapperRef = useRef(null);

	const [show_picker, setShow] = useState(false)
	const [show_date, setDate] = useState(
		getInitialDateForInput(date || new Date(), format)
	)

	// update state if direct prop update
	useEffect(() => {
		setDate(getInitialDateForInput(date || new Date(), format))
	}, [date, format])

	const handleDateUpdate = (date_obj:DatePickerOutPut) => {
		props.onDateUpdate(date_obj)
		setDate(date_obj.formatted)
	}

	const handleComplete = () => {
		setShow(false)
		if(props.onComplete) props.onComplete()
	}

	useOutsideAlerter(wrapperRef, show_picker, () => setShow(false));
	
	return (
		<div className={[styles.picker_input_wrapper, props.className].join(' ')} >
			<input value={show_date} className={styles.picker_input} readOnly
				style={{...props.inputStyle}}
				onFocus={() => setShow(true)} />

			{show_picker &&
				<div className={[styles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
						<div className={styles.picker_model_inside} ref={wrapperRef}>
							<DatePicker date={props.date} format={props.format} 
								weekStartsOn={props.weekStartsOn} colors={props.colors}
								onDateUpdate={handleDateUpdate} onComplete={handleComplete} />
						</div>
				</div>
			}
		</div>
	)
}