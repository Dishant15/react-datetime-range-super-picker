// import React, { useState, useEffect } from 'react'
import React from 'react'

import DatePicker from '../components/DatePicker'
import TimePicker from '../timepicker/TimePicker'

import { 
	DateTimePickerProps, 
	MainDateTimeObject,
	defaultConfigs, 
} from "./interfaces";
import {defaultConfigs as timeDefaultConfigs } from "../timepicker/interfaces"
import {defaultConfigs as dateDefaultConfigs } from "../interfaces/datepicker.interfaces"

import { getInputDate, generateOutPut } from './utils'

import styles from './date_time_picker.css'
import { DatePickerOutPut } from '../interfaces/datepicker.interfaces';
import { OutputTime } from '../timepicker/interfaces';


export class UnwrappedDateTimePicker extends React.Component<DateTimePickerProps, MainDateTimeObject> {

	constructor(props:DateTimePickerProps) {
		super(props)

		this.state = {...getInputDate(props.date, props.format)}
	}

	static defaultProps = {
		format : defaultConfigs.format,
		timeFormat: timeDefaultConfigs.format,
		dateFormat: dateDefaultConfigs.format,
		weekStartsOn : dateDefaultConfigs.weekStartsOn
	}

	static getDerivedStateFromProps(props:DateTimePickerProps) {
		return getInputDate(props.date, props.format)
	}

	handleDateUpdate = (date:DatePickerOutPut) => {
		const {onDateUpdate, onDateTimeUpdate, format} = this.props
		const curr_date = this.state
        
		if(onDateUpdate) onDateUpdate(date)

		if(onDateTimeUpdate) {
			onDateTimeUpdate(generateOutPut(curr_date, format, date))
		}
	}

	handleTimeUpdate = (time:OutputTime) => {
		const {onTimeUpdate, onDateTimeUpdate, format} = this.props
		const curr_date = this.state
        
		if(onTimeUpdate) onTimeUpdate(time)

		if(onDateTimeUpdate) {
			onDateTimeUpdate(generateOutPut(curr_date, format, undefined, time))
		}
	}

	render = () => {
		const curr_date = this.state
		const {dateFormat, weekStartsOn, timeFormat, colors} = this.props

		return (
			<React.Fragment>
				<div className={[styles.table_cell, styles.calender].join(' ')}>
					<DatePicker date={{
							day : curr_date.day,
							month : curr_date.month,
							year : curr_date.year
						}}
						colors={colors}
						format={dateFormat}
						weekStartsOn={weekStartsOn}
						onDateUpdate={this.handleDateUpdate} />
				</div>

				<div className={styles.table_cell}>
					<TimePicker time={{
							hour:curr_date.hour, 
							minute:curr_date.minute,
							meridiem : curr_date.meridiem
						}} 
						colors={colors}
						format={timeFormat}
						onTimeUpdate={this.handleTimeUpdate} />
				</div>
			</React.Fragment>
		)
	}
}

/**
 * Wrapper component required for good design of RangePicker
 * Unwrapped component only has 2 table cells
 * This component wraps table cells into a table
 */
const DateTimePicker = (props:DateTimePickerProps) => (
	<div className={styles.wrapper}>
		<UnwrappedDateTimePicker {...props} />
	</div>
)

export default DateTimePicker