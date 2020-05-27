// import React, { useState, useCallback, useEffect } from 'react';
import React from 'react'

import MonthPicker from "../monthpicker/MonthPicker";

import { formatDate, getWeekList, getDayList, generateDatePickerOutput } from "./utils";
import { DatePickerProps, defaultConfigs, DatePickerState } from "./interfaces";
import { OutputShape } from '../monthpicker/interfaces'

import styles from './datepicker.css'


export default class DatePicker extends React.Component<DatePickerProps, DatePickerState> {

	constructor(props:DatePickerProps) {
		super(props)

		const date_obj = formatDate(props.date)
        console.log("DatePicker -> constructor -> date_obj", date_obj)
		this.state = {
			...date_obj, 
			date_id : `${date_obj.day}-${date_obj.month}`
		}
	}

	static defaultProps = {
		date : defaultConfigs.date,
		weekStartsOn : defaultConfigs.weekStartsOn,
		format : defaultConfigs.format
	}

	static getDerivedStateFromProps(props:DatePickerProps) {
		const date_obj = formatDate(props.date)
		return {...date_obj, date_id : `${date_obj.day}-${date_obj.month}`}
	}

	handleMonthUpdate = (updated_date:OutputShape) => {
		const {day} = this.state
		const {onDateUpdate, format} = this.props

		if(onDateUpdate) onDateUpdate(
			generateDatePickerOutput(day, 
				updated_date.month, updated_date.year, format))
		
	}

	handleDateUpdate = (day_month:string) => {
		const {year} = this.state
		const {onDateUpdate, onComplete, format} = this.props

		const [new_day, new_month] = day_month.split('-').map((s) => Number(s))
		
		if(onDateUpdate) onDateUpdate(
			generateDatePickerOutput(new_day, new_month, year, format))
		
		if(onComplete) onComplete()
	}

	render = () => {
		const {day, month, year, date_id} = this.state
		const {weekStartsOn} = this.props

		const week_header_list = getWeekList(weekStartsOn)
		const day_obj_list = getDayList(day, month, year, weekStartsOn)

		return(
			<div className={styles.wrapper}>
				<MonthPicker time={{month : month, year : year}}
					onDateUpdate={this.handleMonthUpdate} />

				<table className={styles.calender_wrapper}>
				<tbody>

					<tr className={styles.week_day_header}>
						{week_header_list.map((week_str, i) => {
							return (
								<th key={i} className={styles.week_day_title}>
									{week_str}
								</th>
							)
						})}
					</tr>
					
					{day_obj_list.map((week, i) => {
						return (
							<tr className={styles.calender_row} key={i}>

								{week.map((curr_day, j) => {
									const opacity = curr_day.curr_month ? 1 : 0.5
									const day_class = curr_day.id === date_id ?
										styles.calender_cell_active : styles.calender_cell

									return (
										<td key={j} className={day_class}
											onClick={() => this.handleDateUpdate(curr_day.id)}
											style={{opacity}} > {curr_day.day}
										</td>
									)
								})}

							</tr>
						)
					})}
				</tbody>
				</table>
			</div>
		)
	}
}


/**
 * When day variable is passed to handler functions which are used as callbacks
 * day value is always the initial value / default props
 * Due to that when user selects month or year value of day goes back to default prop passed
 * using class component solves this
 */

// export default ({
// 	date=defaultConfigs.date, 
// 	weekStartsOn=defaultConfigs.weekStartsOn, 
// 	format=defaultConfigs.format,
// 	onDateUpdate,
// 	onComplete
// }:DatePickerProps) => {

// 	const {day, month, year} = formatDate(date)
    
// 	const [date_id, setDateID] = useState(`${day}-${month}`)

// 	useEffect(() => {
// 		setDateID(`${day}-${month}`)
// 	}, [day, month])

// 	let handleMonthUpdate = (updated_date:OutputShape) => {

// 		if(onDateUpdate) onDateUpdate(
// 			generateDatePickerOutput(day, 
// 				updated_date.month, updated_date.year, format))
		
// 	}

// 	const handleDateUpdate = useCallback((day_month:string) => {
// 		const [new_day, new_month] = day_month.split('-').map((s) => Number(s))
		
// 		if(onDateUpdate) onDateUpdate(
// 			generateDatePickerOutput(new_day, new_month, year, format))
		
// 		if(onComplete) onComplete()
// 	}, [year])

// 	// create week list
// 	const week_header_list = getWeekList(weekStartsOn)
// 	const day_obj_list = getDayList(day, month, year, weekStartsOn)

// 	return (
// 		<div className={styles.wrapper}>
// 			<MonthPicker time={{month : month, year : year}}
// 				onDateUpdate={handleMonthUpdate} />

// 			<table className={styles.calender_wrapper}>
// 			<tbody>

// 				<tr className={styles.week_day_header}>
// 					{week_header_list.map((week_str, i) => {
// 						return (
// 							<th key={i} className={styles.week_day_title}>
// 								{week_str}
// 							</th>
// 						)
// 					})}
// 				</tr>
				
// 				{day_obj_list.map((week, i) => {
// 					return (
// 						<tr className={styles.calender_row} key={i}>

// 							{week.map((curr_day, j) => {
// 								const opacity = curr_day.curr_month ? 1 : 0.5
// 								const day_class = curr_day.id === date_id ?
// 									styles.calender_cell_active : styles.calender_cell

// 								return (
// 									<td key={j} className={day_class}
// 										onClick={() => handleDateUpdate(curr_day.id)}
// 										style={{opacity}} > {curr_day.day}
// 									</td>
// 								)
// 							})}

// 						</tr>
// 					)
// 				})}
// 			</tbody>
// 			</table>
// 		</div>
// 	)
// }