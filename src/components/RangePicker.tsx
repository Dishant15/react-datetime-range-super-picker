import React from 'react'
import { startOfWeek, endOfWeek, subWeeks,
	startOfMonth, endOfMonth, subMonths,
	startOfToday, endOfToday,
	startOfYesterday, endOfYesterday
} from "date-fns";

import { UnwrappedDateTimePicker } from "./DateTimePicker";
import { getInitialDateForInput, 
	getInputDate, generateOutPut } from '../utils/datetimepicker.utils';

import { RangePickerProps } from '../interfaces/rangepicker.interfaces'
import { DateTimePickerOutPut, defaultConfigs } from '../interfaces/datetimepicker.interfaces';
import { getHeaderFieldColors, getActivePillColors } from '../styles/rangepicker.colors'

import styles from "../styles/rangepicker.css";


export default class RangePicker extends React.Component<RangePickerProps> {

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
		format : defaultConfigs.format
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
			onDone, colors,
		} = this.props

		const common_props = {format, timeFormat, dateFormat, weekStartsOn}

		const from_date_str = getInitialDateForInput(from_date, format)
		const to_date_str = getInitialDateForInput(to_date, format)

		return (
			<div className={styles.wrapper} style={{color: colors.primary_font_color}}>
				<div className={styles.table_wrapper} style={{background: colors.primary_color}}>

					<div className={styles.header} style={{ background: colors.secondary_highlight_color }}>
						<div className={styles.header_div} 
							onClick={() => this.setState({is_to_date:false})} >

							<div className={styles.header_label} style={{ color: colors.primary_color }}>From</div>
							<div className={styles.header_field_abs}
								style={getHeaderFieldColors(colors, !is_to_date)}>
								{from_date_str}
							</div>

						</div>

						<div className={styles.header_div}
							onClick={() => this.setState({is_to_date:true})} 
						>
							<div className={styles.header_label} style={{ color: colors.primary_color }}>To</div>
							<div className={styles.header_field_abs}
								style={getHeaderFieldColors(colors, is_to_date)}>
								{to_date_str}
							</div>
						</div>

						{Boolean(onDone) &&
							<div className={styles.done_btn}
								style={{ color: colors.primary_highlight_color }}
								onClick={onDone}>
								Close
							</div>
						}

					</div>

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

							<div className={styles.advance_pill} 
								style={getActivePillColors(colors, advance_pill === 't')}
								onClick={this.handleToday}>
								Today
							</div>
							<div className={styles.advance_pill} 
								style={getActivePillColors(colors, advance_pill === 'y')}
								onClick={this.handleYesterday}>
								Yesterday
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

	handleToday = () => {
		const {format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props

		const from_ts = startOfToday()
		const to_ts = endOfToday()
		this.setState({advance_pill: 't'})
		// call related handlers
		onFromDateTimeUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateTimeUpdate(generateOutPut(getInputDate(to_ts), format))
	}

	handleYesterday = () => {
		const {format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props

		const from_ts = startOfYesterday()
		const to_ts = endOfYesterday()
		this.setState({advance_pill: 'y'})
		// call related handlers
		onFromDateTimeUpdate(generateOutPut(getInputDate(from_ts), format))
		onToDateTimeUpdate(generateOutPut(getInputDate(to_ts), format))
	}
	
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