import React from 'react'
import { startOfWeek, endOfWeek, subWeeks,
	startOfMonth, endOfMonth, subMonths,
} from "date-fns";

import { UnwrappedDateTimePicker } from "./DateTimePicker";
import { getInputDate, generateOutPut } from '../utils/datetimepicker.utils';

import { RangePickerProps } from '../interfaces/rangepicker.interfaces'
import { DateTimePickerOutPut, defaultConfigs } from '../interfaces/datetimepicker.interfaces';
import { getActivePillColors } from '../styles/rangepicker.colors'

import styles from "../styles/rangepicker.css";


export default class DateRangePicker extends React.Component<RangePickerProps> {

	state = {
		// from date is selected as default
		is_to_date : false,
		// which advance pill is selected
		advance_pill : null,
	}

	static defaultProps = {
		from_date : defaultConfigs.date,
		to_date : defaultConfigs.date,
		weekStartsOn : defaultConfigs.weekStartsOn,
		format : defaultConfigs.format,
		closeButtonText: 'Close'
	}

	handleDateTimeUpdate = (date_time:DateTimePickerOutPut) => {
		const {is_to_date} = this.state
		const {onFromDateTimeUpdate, onToDateTimeUpdate} = this.props

		this.setState({advance_pill : null})
		if(is_to_date) {
			onToDateTimeUpdate(date_time)
		} else {
			onFromDateTimeUpdate(date_time)
		}
	}

	render = () => {
		const {is_to_date, advance_pill} = this.state
		const {format, timeFormat, dateFormat, weekStartsOn,
			from_date, onFromTimeUpdate, onFromDateUpdate,
			to_date, onToTimeUpdate, onToDateUpdate,
			colors,
		} = this.props

		const common_props = {format, timeFormat, dateFormat, weekStartsOn}

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

						{is_to_date ? 
							// To date component
							<UnwrappedDateTimePicker date={to_date} colors={colors}
								onTimeUpdate={onToTimeUpdate} onDateUpdate={onToDateUpdate}
								onDateTimeUpdate={this.handleDateTimeUpdate} {...common_props} />
							:
								// from date first
							<UnwrappedDateTimePicker date={from_date} colors={colors}
								onTimeUpdate={onFromTimeUpdate} onDateUpdate={onFromDateUpdate}
								onDateTimeUpdate={this.handleDateTimeUpdate} {...common_props} />
						}
					</div>
				</div>
			</div>
		)
	}

	// Advanced picker handler logic
	
	handleLastMonth = () => {
		const {format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const now = new Date()

		let from_ts = startOfMonth(now)
		from_ts = subMonths(from_ts, 1)
		let to_ts = endOfMonth(now)
		to_ts = subMonths(to_ts, 1)
		this.setState({advance_pill: 'lm'})
		// call related handlers
		onFromDateTimeUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateTimeUpdate(generateOutPut(getInputDate(to_ts), format))
	}

	handleThisMonth = () => {
		const {format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const now = new Date()

		const from_ts = startOfMonth(now)
		const to_ts = endOfMonth(now)
		this.setState({advance_pill: 'tm'})
		// call related handlers
		onFromDateTimeUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateTimeUpdate(generateOutPut(getInputDate(to_ts), format))
	}

	handleThisWeek = () => {
		const {weekStartsOn, format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const now = new Date()
		// @ts-ignore
		const from_ts = startOfWeek(now, {weekStartsOn})
		// @ts-ignore
		const to_ts = endOfWeek(now, {weekStartsOn})
		this.setState({advance_pill: 'tw'})
		// call related handlers
		onFromDateTimeUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateTimeUpdate(generateOutPut(getInputDate(to_ts), format))
	}

	handleLastWeek = () => {
		const {weekStartsOn, format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const now = new Date()
		// @ts-ignore
		let from_ts = startOfWeek(now, {weekStartsOn})
		from_ts = subWeeks(from_ts, 1)
		// @ts-ignore
		let to_ts = endOfWeek(now, {weekStartsOn})
		to_ts = subWeeks(to_ts, 1)
		this.setState({advance_pill: 'lw'})
		// call related handlers
		onFromDateTimeUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateTimeUpdate(generateOutPut(getInputDate(to_ts), format))
	}
}