import React, { useState, useCallback, useEffect } from 'react';

import MonthPicker from "../monthpicker/MonthPicker";

import { formatDate, getWeekList, getDayList, generateDatePickerOutput } from "./utils";
import { DatePickerProps } from "./interfaces";
import { OutputShape } from '../monthpicker/interfaces'

import styles from './datepicker.css'


export default ({
	date=new Date(), 
	weekStartsOn=0, 
	format='dd/MM/YYY',
	onDateUpdate
}:DatePickerProps) => {

	const {day, month, year} = formatDate(date)
    
	const [date_id, setDateID] = useState(`${day}-${month}`)

	useEffect(() => {
		setDateID(`${day}-${month}`)
	}, [day, month])

	let handleMonthUpdate = (updated_date:OutputShape) => {

		if(onDateUpdate) onDateUpdate(
			generateDatePickerOutput(day, 
				updated_date.month, updated_date.year, format))
		
	}

	const handleDateUpdate = useCallback((day_month:string) => {
		const [new_day, new_month] = day_month.split('-').map((s) => Number(s))
		
		if(onDateUpdate) onDateUpdate(
			generateDatePickerOutput(new_day, new_month, year, format))
	}, [year])

	// create week list
	const week_header_list = getWeekList(weekStartsOn)
	const day_obj_list = getDayList(day, month, year, weekStartsOn)

	return (
		<div className={styles.wrapper}>
			<MonthPicker time={{month : month, year : year}}
				onDateUpdate={handleMonthUpdate} />

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
										onClick={() => handleDateUpdate(curr_day.id)}
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