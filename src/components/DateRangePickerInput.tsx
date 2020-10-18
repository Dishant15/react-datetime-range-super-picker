import React, { useState, useRef } from 'react';

import DateRangePicker from "./DateRangePicker";
import { DateRangePickerInputProps } from '../interfaces/rangepicker.interfaces';
import {defaultConfigs as dateDefaultConfigs } from "../interfaces/datepicker.interfaces"
import { getInitialDateForInput } from '../utils/datetimepicker.utils';

import { useOutsideAlerter } from '../utils/useOutsideAlerter.hook'

import styles from "../styles/rangepicker.css";


const DateRangePickerInput = (props: DateRangePickerInputProps) => {
	const wrapperRef = useRef(null);

	const [show_picker, setShow] = useState(false)

	useOutsideAlerter(wrapperRef, show_picker, () => setShow(false));


	const from_date_str = getInitialDateForInput(props.from_date, props.format || dateDefaultConfigs.format)
	const to_date_str = getInitialDateForInput(props.to_date, props.format || dateDefaultConfigs.format)
	const show_date = `${from_date_str} To ${to_date_str}`
	const {colors} = props

	return (
		<div ref={wrapperRef} className={[styles.picker_input_wrapper, props.className].join(' ')} >
			<input value={show_date} className={styles.picker_input} 
				readOnly disabled={props.isDisabled}
				style={{...props.inputStyle}}
				onFocus={() => setShow(true)} />

			{(show_picker && !props.isDisabled) &&
				<div className={[styles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
						<div className={styles.picker_model_inside} >
							<DateRangePicker from_date={props.from_date} to_date={props.to_date}
								format={props.format}
								weekStartsOn={props.weekStartsOn}
								closeButtonText={props.closeButtonText}
								onFromDateUpdate={props.onFromDateUpdate}
								onToDateUpdate={props.onToDateUpdate}
								onDone={() => setShow(false)} 
								colors={colors}
								showRangeTrace={false} />
						</div>
				</div>
			}
		</div>
	)
}

DateRangePickerInput.defaultProps = {
	closeButtonText: 'Done',
	isDisabled: false
}


export default DateRangePickerInput