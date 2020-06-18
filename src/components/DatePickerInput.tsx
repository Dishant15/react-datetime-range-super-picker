import React, { useState } from 'react';

import DatePicker from './DatePicker'

import { getInitialDateForInput } from '../utils/datepicker.utils';
import { DatePickerInputProps, DatePickerOutPut } from "../interfaces/datepicker.interfaces";

import styles from '../styles/datepicker.css'


export default (props:DatePickerInputProps) => {

	const [show_picker, setShow] = useState(false)
	const [show_date, setDate] = useState(
		getInitialDateForInput(props.date || new Date(), props.format)
	)

	const handleDateUpdate = (date_obj:DatePickerOutPut) => {
		props.onDateUpdate(date_obj)
		setDate(date_obj.formatted)
	}

	const handleComplete = () => {
		setShow(false)
		if(props.onComplete) props.onComplete()
	}

	return (
		<div className={[styles.picker_input_wrapper, props.className].join(' ')} >
			<input value={show_date} className={styles.picker_input} readOnly
				style={{borderBottom:'1px solid #88b04b', ...props.inputStyle}}
				onFocus={() => setShow(true)} />

			{show_picker &&
				<div className={[styles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
					<DatePicker date={props.date} format={props.format} 
						weekStartsOn={props.weekStartsOn} colors={props.colors}
						onDateUpdate={handleDateUpdate} onComplete={handleComplete} />
				</div>
			}
		</div>
	)
}