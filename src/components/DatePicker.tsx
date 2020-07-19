// import React, { useState, useCallback, useEffect } from 'react';
import React from 'react'

import MonthPicker from "./MonthPicker";

import { formatDate, getWeekList, getDayList, generateDatePickerOutput } from "../utils/datepicker.utils";
import { DatePickerProps, defaultConfigs, DatePickerState } from "../interfaces/datepicker.interfaces";
import { OutputShape } from '../interfaces/monthpicker.interfaces'
import { getWrapperStyles, getCalenderCellColors } from '../styles/datepicker.color'

import styles from '../styles/datepicker.css'


export default class DatePicker extends React.Component<DatePickerProps, DatePickerState> {

	constructor(props:DatePickerProps) {
		super(props)

		const date_obj = formatDate(props.date, props.format)
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
		const date_obj = formatDate(props.date, props.format)
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
		const {year, month} = this.state
		const {onDateUpdate, onComplete, format} = this.props

		const [new_day, new_month] = day_month.split('-').map((s) => Number(s))
		let new_year = year
		
		if(month === 0 && new_month === 11) {
			// user selected december date from january
			// change year
			new_year = year - 1
		} else if(month === 11 && new_month === 0) {
			// user selected jan date from dec
			// change year
			new_year = year + 1
		}
		
		if(onDateUpdate) onDateUpdate(
			generateDatePickerOutput(new_day, new_month, new_year, format))
		
		if(onComplete) onComplete()
	}

	render = () => {
		const {day, month, year, date_id} = this.state
		const {weekStartsOn, colors} = this.props

		const week_header_list = getWeekList(weekStartsOn)
		const day_obj_list = getDayList(day, month, year, weekStartsOn)

		return(
			<div className={styles.wrapper} style={{ background: colors.primary_color }}>
				<MonthPicker time={{month : month, year : year}}
					colors={colors}
					onDateUpdate={this.handleMonthUpdate} />

				<table className={styles.calender_wrapper} style={getWrapperStyles(colors)}>
				<tbody>

					<tr className={styles.week_day_header}>
						{week_header_list.map((week_str, i) => {
							return (
								<th key={i} className={styles.week_day_title} style={{ color: colors.primary_highlight_color }}>
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
									const day_styles = getCalenderCellColors(colors, curr_day.id === date_id)

									return (
										<td key={j} className={styles.calender_cell}
											onClick={() => this.handleDateUpdate(curr_day.id)}
											style={{opacity, ...day_styles }} > {curr_day.day}
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