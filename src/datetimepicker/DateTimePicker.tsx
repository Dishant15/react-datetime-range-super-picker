// import React, { useState, useEffect } from 'react'
import React from 'react'

import DatePicker from '../datepicker/DatePicker'
import TimePicker from '../timepicker/TimePicker'

import { 
	DateTimePickerProps, 
	MainDateTimeObject,
	defaultConfigs, 
} from "./interfaces";
import {defaultConfigs as timeDefaultConfigs } from "../timepicker/interfaces"
import {defaultConfigs as dateDefaultConfigs } from "../datepicker/interfaces"

import { getInputDate, generateOutPut } from './utils'

import styles from './date_time_picker.css'
import { DatePickerOutPut } from '../datepicker/interfaces';
import { OutputTime } from '../timepicker/interfaces';


export default class DateTimePicker extends React.Component<DateTimePickerProps, MainDateTimeObject> {

	constructor(props:DateTimePickerProps) {
		super(props)

		this.state = {...getInputDate(props.date)}
	}

	static defaultProps = {
		format : defaultConfigs.format,
		timeFormat: timeDefaultConfigs.format,
		dateFormat: dateDefaultConfigs.format,
		weekStartsOn : dateDefaultConfigs.weekStartsOn
	}

	static getDerivedStateFromProps(props:DateTimePickerProps) {
		return getInputDate(props.date)
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
		const {dateFormat, weekStartsOn, timeFormat} = this.props

		return (
			<div className={styles.wrapper} >
				<div className={styles.table_cell}>
					<DatePicker date={{
							day : curr_date.day,
							month : curr_date.month,
							year : curr_date.year
						}}
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
						format={timeFormat}
						onTimeUpdate={this.handleTimeUpdate} />
				</div>
			</div>
		)
	}
}


// export default ({
// 	date=defaultConfigs.date, 
// 	weekStartsOn=defaultConfigs.weekStartsOn, 
// 	format=defaultConfigs.format,
// 	timeFormat=timeDefaultConfigs.format,
// 	dateFormat=dateDefaultConfigs.format,
// 	onDateTimeUpdate,
// 	onTimeUpdate,
// 	onDateUpdate
// } : DateTimePickerProps) => {

// 	const [curr_date, setCurrDate] = useState(getInputDate(date))
//     console.log("curr_date", curr_date)

// 	useEffect(() => {
// 		setCurrDate(getInputDate(date))
// 	}, [date])

// 	const handleDateUpdate = (date:DatePickerOutPut) => {
//         console.log("handleDateUpdate -> curr_date", curr_date)
// 		if(onDateUpdate) onDateUpdate(date)

// 		if(onDateTimeUpdate) {
// 			onDateTimeUpdate(generateOutPut(curr_date, format, date))
// 		}
// 	}

// 	const handleTimeUpdate = (time:OutputTime) => {
//         console.log("handleTimeUpdate -> curr_date", curr_date)
// 		if(onTimeUpdate) onTimeUpdate(time)

// 		if(onDateTimeUpdate) {
// 			onDateTimeUpdate(generateOutPut(curr_date, format, undefined, time))
// 		}
// 	}

// 	return (
// 		<div className={styles.wrapper} >
// 			<div className={styles.table_cell}>
// 				<DatePicker date={{
// 						day : curr_date.day,
// 						month : curr_date.month,
// 						year : curr_date.year
// 					}}
// 					format={dateFormat}
// 					weekStartsOn={weekStartsOn}
// 					onDateUpdate={handleDateUpdate} />
// 			</div>

// 			<div className={styles.table_cell}>
// 				<TimePicker time={{
// 						hour:curr_date.hour, 
// 						minute:curr_date.minute,
// 						meridiem : curr_date.meridiem
// 					}} 
// 					format={timeFormat}
// 					onTimeUpdate={handleTimeUpdate} />
// 			</div>
// 		</div>
// 	)
// }