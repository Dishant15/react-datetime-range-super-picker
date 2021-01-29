import React from 'react'
import { startOfWeek, endOfWeek, subWeeks,
	startOfMonth, endOfMonth, subMonths,
} from "date-fns";

import DatePicker from './DatePicker'
import { getInputDate, generateOutPut } from '../utils/datetimepicker.utils';
import { createRangeIndex } from '../utils/datepicker.utils';

import { DateRangePickerProps, RangePickerStates } from '../interfaces/rangepicker.interfaces'
import { defaultConfigs } from '../interfaces/datetimepicker.interfaces';
import {defaultConfigs as dateDefaultConfigs, DatePickerOutPut } from "../interfaces/datepicker.interfaces"
import { getActivePillColors } from '../styles/rangepicker.colors'

import styles from "../styles/rangepicker.css";


export default class DateRangePicker extends React.Component<DateRangePickerProps, RangePickerStates> {

	constructor(props:DateRangePickerProps) {
		super(props);

		const date_obj = getInputDate(props.to_date)
		let otherDateRangeIndex = createRangeIndex(date_obj.day, date_obj.month, date_obj.year)

		this.state = {
			// from date is selected as default
			is_to_date : false,
			// 'F' , user is selecting from date, 
			// 'T' , user is selecting To date, 'A' : all dates selected
			traceStatus: 'F',
			// which advance pill is selected
			advance_pill : null,
			otherDateRangeIndex,
		}
	}

	static defaultProps = {
		from_date : defaultConfigs.date,
		to_date : defaultConfigs.date,
		weekStartsOn : dateDefaultConfigs.weekStartsOn,
		format : dateDefaultConfigs.format,
		closeButtonText: 'Close'
	}

	handleToDateUpdate = (date_time:DatePickerOutPut) => {
		const {onToDateUpdate} = this.props

		const otherDateRangeIndex = createRangeIndex(date_time.day, date_time.month, date_time.year)
		this.setState({advance_pill : null, is_to_date: false, otherDateRangeIndex,
			traceStatus:'A'})
		onToDateUpdate(date_time)
	}

	handleFromDateUpdate = (date_time:DatePickerOutPut) => {
		const {onFromDateUpdate} = this.props

		const otherDateRangeIndex = createRangeIndex(date_time.day, date_time.month, date_time.year)
		this.setState({advance_pill : null, is_to_date: true, otherDateRangeIndex, 
			traceStatus:'T'})
		onFromDateUpdate(date_time)
	}

	render = () => {
		const {advance_pill, is_to_date, otherDateRangeIndex, 
			traceStatus} = this.state
		const {format, weekStartsOn,
			from_date, to_date,
			colors
		} = this.props

		const currDate = is_to_date ? to_date : from_date
		const handler = is_to_date ? this.handleToDateUpdate : this.handleFromDateUpdate

		const datePickerProps = { colors, format, weekStartsOn, otherDateRangeIndex,
			onDateUpdate: handler, date: currDate,
			showRangeTrace:true, traceStatus }

		return (
			<div className={styles.wrapper} style={{color: colors.primary_font_color}}>
				<div className={styles.table_wrapper} style={{background: colors.primary_color}}>

					<div>
						<div className={styles.advance_cell} style={{ background: colors.secondary_highlight_color }}>
							<div className={styles.advance_pill}
								style={getActivePillColors(colors, advance_pill === 'tm')}
								onClick={this.handleThisMonth}>
								This Month
							</div>
							<div className={styles.advance_pill} 
								style={getActivePillColors(colors, advance_pill === 'lm')}
								onClick={this.handleLastMonth}>
								Last Month
							</div>

							<div className={styles.advance_pill} 
								style={getActivePillColors(colors, advance_pill === 'tw')}
								onClick={this.handleThisWeek} >
								This Week
							</div>
							<div className={styles.advance_pill} 
								style={getActivePillColors(colors, advance_pill === 'lw')}
								onClick={this.handleLastWeek}>
								Last Week
							</div>
						</div>

						{/* from date first */}
						<div className={[styles.table_cell, styles.picker_pad_right].join(' ')}>
							<DatePicker {...datePickerProps} />
						</div>
	
					</div>
				</div>
			</div>
		)
	}

	// Advanced picker handler logic
	
	handleLastMonth = () => {
		const {format,
			onFromDateUpdate, onToDateUpdate} = this.props
		const lastMonth = subMonths(new Date(), 1)

		let from_ts = startOfMonth(lastMonth)
		let to_ts = endOfMonth(lastMonth)

		// set range again
		const date_obj = getInputDate(from_ts)
		const otherDateRangeIndex = createRangeIndex(date_obj.day, date_obj.month, date_obj.year)
		this.setState({advance_pill: 'lm', is_to_date: true, otherDateRangeIndex, traceStatus: 'A'})
		// call related handlers
		onFromDateUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateUpdate(generateOutPut(getInputDate(to_ts), format))
	}

	handleThisMonth = () => {
		const {format,
			onFromDateUpdate, onToDateUpdate} = this.props
		const now = new Date()

		const from_ts = startOfMonth(now)
		const to_ts = endOfMonth(now)
		// set range again
		const date_obj = getInputDate(from_ts)
		const otherDateRangeIndex = createRangeIndex(date_obj.day, date_obj.month, date_obj.year)
		this.setState({advance_pill: 'tm', is_to_date: true, otherDateRangeIndex, traceStatus: 'A'})
		// call related handlers
		onFromDateUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateUpdate(generateOutPut(getInputDate(to_ts), format))
	}

	handleThisWeek = () => {
		const {weekStartsOn, format,
			onFromDateUpdate, onToDateUpdate} = this.props
		const now = new Date()
		// @ts-ignore
		const from_ts = startOfWeek(now, {weekStartsOn})
		// @ts-ignore
		const to_ts = endOfWeek(now, {weekStartsOn})
		// set range again
		const date_obj = getInputDate(from_ts)
		const otherDateRangeIndex = createRangeIndex(date_obj.day, date_obj.month, date_obj.year)
		this.setState({advance_pill: 'tw', is_to_date: true, otherDateRangeIndex, traceStatus: 'A'})
		// call related handlers
		onFromDateUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateUpdate(generateOutPut(getInputDate(to_ts), format))
	}

	handleLastWeek = () => {
		const {weekStartsOn, format, 
			onFromDateUpdate, onToDateUpdate} = this.props
		const now = new Date()
		// @ts-ignore
		let from_ts = startOfWeek(now, {weekStartsOn})
		from_ts = subWeeks(from_ts, 1)
		// @ts-ignore
		let to_ts = endOfWeek(now, {weekStartsOn})
		to_ts = subWeeks(to_ts, 1)
		// set range again
		const date_obj = getInputDate(from_ts)
		const otherDateRangeIndex = createRangeIndex(date_obj.day, date_obj.month, date_obj.year)
		this.setState({advance_pill: 'lw', is_to_date: true, otherDateRangeIndex, traceStatus: 'A'})
		// call related handlers
		onFromDateUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateUpdate(generateOutPut(getInputDate(to_ts), format))
	}
}