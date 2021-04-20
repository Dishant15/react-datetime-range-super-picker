import React, { useState, useRef, useCallback } from 'react';

import DateRangePicker from "./DateRangeCalendarPicker";
import { DateRangePickerInputProps } from '../interfaces/rangepicker.interfaces';
import {defaultConfigs as dateDefaultConfigs } from "../interfaces/datepicker.interfaces"
import { getInitialDateForInput } from '../utils/datetimepicker.utils';

import { useOutsideAlerter } from '../utils/useOutsideAlerter.hook'

import styles from "../styles/rangepicker.css";
import rootstyles from "../styles/root.css";


const DateRangeCalendarPickerInput = (props: DateRangePickerInputProps) => {
	const wrapperRef = useRef(null);

	const [show_picker, setShow] = useState(false)

	useOutsideAlerter(wrapperRef, setShow);

	const handleShow = useCallback(() => {
		setShow(true)
	},[])

	const from_date_str = getInitialDateForInput(props.from_date, props.format || dateDefaultConfigs.format)
	const to_date_str = getInitialDateForInput(props.to_date, props.format || dateDefaultConfigs.format)
	const show_date = `${from_date_str || '-- / -- / --  '} To ${to_date_str || '  -- / -- / --'}`
	const {colors} = props

	const inputComponentProps = {
		value: show_date,
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
							<DateRangePicker from_date={props.from_date} to_date={props.to_date}
								format={props.format}
								weekStartsOn={props.weekStartsOn}
								closeButtonText={props.closeButtonText}
								onFromDateUpdate={props.onFromDateUpdate}
								onToDateUpdate={props.onToDateUpdate}
								onDone={() => setShow(false)} 
								colors={colors} />
						</div>
				</div>
			}
		</div>
	)
}

DateRangeCalendarPickerInput.defaultProps = {
	closeButtonText: 'Done',
	isDisabled: false
}


export default DateRangeCalendarPickerInput