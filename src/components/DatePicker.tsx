import React from 'react'

import MonthPicker from "./MonthPicker";

import { formatDate, getWeekList, getDayList, 
	generateDatePickerOutput, createRangeIndex, parseRangeIndex } from "../utils/datepicker.utils";
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
			dateRangeIndex: createRangeIndex(date_obj.day, date_obj.month, date_obj.year),
			// hover states
			hoverOn: false,
			hoverRangeIndex: 0,
		}
	}

	static defaultProps = {
		date : defaultConfigs.date,
		weekStartsOn : defaultConfigs.weekStartsOn,
		format : defaultConfigs.format,
		showRangeTrace: false,
		otherDateRangeIndex: 0,
	}

	static getDerivedStateFromProps(props:DatePickerProps) {
		const date_obj = formatDate(props.date, props.format)
		return {
			...date_obj, 
			dateRangeIndex: createRangeIndex(date_obj.day, date_obj.month, date_obj.year)
		}
	}

	handleMonthUpdate = (updated_date:OutputShape) => {
		const {day} = this.state
		const {onDateUpdate, format} = this.props

		if(onDateUpdate) onDateUpdate(
			generateDatePickerOutput(day, 
				updated_date.month, updated_date.year, format), false)
		// is_date_update is false because this will not update To / from state selection
		// mainly used for date range picker
	}

	handleDateUpdate = (rangeIndex:number) => {
		const {onDateUpdate, onComplete, format} = this.props

		const [new_day, new_month, new_year] = parseRangeIndex(rangeIndex)
		
		if(onDateUpdate) onDateUpdate(
			generateDatePickerOutput(new_day, new_month, new_year, format))
		
		if(onComplete) onComplete()
	}

	handleMouseEnter = (hoverRangeIndex:number) => () => {
		this.setState({
			hoverOn: true, hoverRangeIndex,
		})
	}

	handleMouseLeave = () => {
		this.setState({
			hoverOn: false, hoverRangeIndex: 0,
		})
	}

	render = () => {
		const {day, month, year,
			hoverOn, hoverRangeIndex, dateRangeIndex} = this.state;
		const {weekStartsOn, colors,  otherDateRangeIndex,
			showRangeTrace, traceStatus} = this.props;

		const week_header_list = getWeekList(weekStartsOn)
		const day_obj_list = getDayList(day, month, year, weekStartsOn)

		let minRangeIndex:number, maxRangeIndex:number;
		// create min max selected range end points of our current range
		if(showRangeTrace) {
			// if user selected both date only show selected Range and disable hover highlights
			const compareDate = traceStatus==='A' ? dateRangeIndex :
			// if hover than show range on hover state, else show on selected state
				hoverOn ? hoverRangeIndex : dateRangeIndex;
			minRangeIndex = Math.min(compareDate, otherDateRangeIndex)
			maxRangeIndex = Math.max(compareDate, otherDateRangeIndex)
		}

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
									// style current cell according to hover state, for DateRangePicker
									let cell_type = ''
									if(curr_day.rangeIndex === dateRangeIndex) {
										// only when selecting To date dont show curr day as solid
										if(traceStatus !== 'T') cell_type = 'solid'
									}
									else if(curr_day.rangeIndex === otherDateRangeIndex) {
										// other selected day will be simple when selecting from date
										if(traceStatus==='T' || traceStatus==='A') cell_type = 'solid';
									}
									else if(curr_day.rangeIndex < maxRangeIndex && 
										curr_day.rangeIndex > minRangeIndex) {
										// range between hovered date and selected From date
										if(traceStatus==='T') cell_type = 'border'
										// range between From date and To date
										else if(traceStatus==='A') cell_type = 'solid'
									}
									
									const day_styles = getCalenderCellColors(colors, cell_type)

									return (
										<td key={j} className={styles.calender_cell}
											onClick={() => this.handleDateUpdate(curr_day.rangeIndex)}
											onMouseEnter={this.handleMouseEnter(curr_day.rangeIndex)}
											onMouseLeave={this.handleMouseLeave}
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