import React from 'react'
import { startOfWeek, endOfWeek, subWeeks,
	startOfMonth, endOfMonth, subMonths,
} from "date-fns";

import DatePicker from './DatePicker'
import { generateDatePickerOutput } from '../utils/datepicker.utils';

import { DateRangePickerProps, DateRangeCalendarPickerStates } from '../interfaces/rangepicker.interfaces'
import {defaultConfigs as dateDefaultConfigs, DatePickerOutPut } from "../interfaces/datepicker.interfaces"
import { getActivePillColors } from '../styles/rangepicker.colors'

import styles from "../styles/rangepicker.css";


export default class DateRangeCalendarPicker extends React.Component<DateRangePickerProps, DateRangeCalendarPickerStates> {

	state = {
		// from date is selected as default
		is_to_date : false,
		// which advance pill is selected
		advance_pill : null,
	}

	static defaultProps = {
		weekStartsOn : dateDefaultConfigs.weekStartsOn,
		format : dateDefaultConfigs.format,
		closeButtonText: 'Close'
	}

	handleToDateUpdate = (date_time:DatePickerOutPut) => {
		const {onToDateUpdate} = this.props

		this.setState({advance_pill : null})
		onToDateUpdate(date_time)
	}

	handleFromDateUpdate = (date_time:DatePickerOutPut) => {
		const {onFromDateUpdate} = this.props

		this.setState({advance_pill : null})
		onFromDateUpdate(date_time)
	}

	render = () => {
		const {advance_pill} = this.state
		const {format, weekStartsOn,
			from_date, to_date,
			colors
		} = this.props

		const common_props = {format, weekStartsOn, otherDateRangeIndex: 0}

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
							<DatePicker date={from_date} colors={colors}
								onDateUpdate={this.handleFromDateUpdate}
								showRangeTrace={false}
								{...common_props} />
						</div>

						<div className={[styles.table_cell, styles.separator_wrapper].join(' ')}
							style={{color: colors.secondary_color}}>
							<div className={styles.separator_circle} 
								style={{ color: colors.primary_highlight_color }}>
								<div className={styles.separator}>To</div>
							</div>
						</div>

						{/* To date component */}
						<div className={[styles.table_cell, styles.picker_pad_left].join(' ')}>
							<DatePicker date={to_date} colors={colors}
								onDateUpdate={this.handleToDateUpdate}
								showRangeTrace={false}
								{...common_props} />
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
		this.setState({advance_pill: 'lm'})
		// call related handlers
		onFromDateUpdate(generateDatePickerOutput(
			from_ts.getDate(), from_ts.getMonth(), from_ts.getFullYear(), format
		))
		onToDateUpdate(generateDatePickerOutput(
			to_ts.getDate(), to_ts.getMonth(), to_ts.getFullYear(), format
		))
	}

	handleThisMonth = () => {
		const {format,
			onFromDateUpdate, onToDateUpdate} = this.props
		const now = new Date()

		const from_ts = startOfMonth(now)
		const to_ts = endOfMonth(now)
		this.setState({advance_pill: 'tm'})
		// call related handlers
		onFromDateUpdate(generateDatePickerOutput(
			from_ts.getDate(), from_ts.getMonth(), from_ts.getFullYear(), format
		))
		onToDateUpdate(generateDatePickerOutput(
			to_ts.getDate(), to_ts.getMonth(), to_ts.getFullYear(), format
		))
	}

	handleThisWeek = () => {
		const {weekStartsOn, format,
			onFromDateUpdate, onToDateUpdate} = this.props
		const now = new Date()
		// @ts-ignore
		const from_ts = startOfWeek(now, {weekStartsOn})
		// @ts-ignore
		const to_ts = endOfWeek(now, {weekStartsOn})
		this.setState({advance_pill: 'tw'})
		// call related handlers
		onFromDateUpdate(generateDatePickerOutput(
			from_ts.getDate(), from_ts.getMonth(), from_ts.getFullYear(), format
		))
		onToDateUpdate(generateDatePickerOutput(
			to_ts.getDate(), to_ts.getMonth(), to_ts.getFullYear(), format
		))
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
		this.setState({advance_pill: 'lw'})
		// call related handlers
		onFromDateUpdate(generateDatePickerOutput(
			from_ts.getDate(), from_ts.getMonth(), from_ts.getFullYear(), format
		))
		onToDateUpdate(generateDatePickerOutput(
			to_ts.getDate(), to_ts.getMonth(), to_ts.getFullYear(), format
		))
	}
}