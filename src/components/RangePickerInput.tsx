import React, { useState } from 'react';

import RangePicker from "./RangePicker";
import { RangePickerInputProps } from '../interfaces/rangepicker.interfaces';
import { getInitialDateForInput } from '../utils/datetimepicker.utils';

import styles from "../styles/rangepicker.css";


export default (props: RangePickerInputProps) => {
	const [show_picker, setShow] = useState(false)

	const from_date_str = getInitialDateForInput(props.from_date, props.format)
	const to_date_str = getInitialDateForInput(props.to_date, props.format)
	const show_date = `${from_date_str} To ${to_date_str}`
	const {colors} = props

	return (
		<div className={[styles.picker_input_wrapper, props.className].join(' ')} >
			<input value={show_date} className={styles.picker_input} readOnly
				style={{borderBottom:'1px solid #88b04b', ...props.inputStyle}}
				onFocus={() => setShow(true)} />

			{show_picker &&
				<div className={[styles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
					<RangePicker from_date={props.from_date} to_date={props.to_date}
						format={props.format} timeFormat={props.timeFormat} dateFormat={props.dateFormat}
						weekStartsOn={props.weekStartsOn} 
						onFromDateUpdate={props.onFromDateUpdate} onFromTimeUpdate={props.onFromTimeUpdate}
						onFromDateTimeUpdate={props.onFromDateTimeUpdate}
						onToDateUpdate={props.onToDateUpdate} onToTimeUpdate={props.onToTimeUpdate}
						onToDateTimeUpdate={props.onToDateTimeUpdate}
						onDone={() => setShow(false)} colors={colors} />
				</div>
			}
		</div>
	)
}