import React, { useState } from 'react';

import DateTimePicker from './DateTimePicker'

import { getInitialDateForInput } from '../utils/datetimepicker.utils';
import { DateTimePickerInputProps, DateTimePickerOutPut } from "../interfaces/datetimepicker.interfaces";

import styles from '../styles/date_time_picker.css'


export default (props:DateTimePickerInputProps) => {

	const [show_picker, setShow] = useState(false)
	const [show_date, setDate] = useState(
		getInitialDateForInput(props.date || new Date(), props.format)
	)

	const handleDateUpdate = (date_obj:DateTimePickerOutPut) => {
		props.onDateTimeUpdate(date_obj)
		setDate(date_obj.formatted)
	}

	const handleComplete = () => {
		setShow(false)
	}

	return (
		<div className={[styles.picker_input_wrapper, props.className].join(' ')} >
			<input value={show_date} className={styles.picker_input} readOnly
				style={{borderBottom:'1px solid #88b04b', ...props.inputStyle}}
				onFocus={() => setShow(true)} />

			{show_picker &&
				<div className={[styles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
					<div className={styles.picker_header_wrapper} style={{background:'#51ADAC'}}>
						<div className={styles.picker_header_btn} onClick={handleComplete}
							style={{background:'white', color:'#51ADAC'}} >
							Done 
						</div>
					</div>
					<DateTimePicker date={props.date} colors={props.colors}
						format={props.format} timeFormat={props.timeFormat} dateFormat={props.dateFormat}
						weekStartsOn={props.weekStartsOn} 
						onDateUpdate={props.onDateUpdate} onTimeUpdate={props.onTimeUpdate}
						onDateTimeUpdate={handleDateUpdate} />
				</div>
			}
		</div>
	)
}