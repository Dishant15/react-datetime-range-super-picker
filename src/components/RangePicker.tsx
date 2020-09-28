import React from 'react'
import { startOfWeek, endOfWeek, subWeeks,
	startOfMonth, endOfMonth, subMonths,
	startOfToday, endOfToday,
	startOfYesterday, endOfYesterday
} from "date-fns";

import { UnwrappedDateTimePicker } from "./DateTimePicker";
import { getInitialDateForInput, 
	getInputDate, generateOutPut } from '../utils/datetimepicker.utils';
import { createRangeIndex } from '../utils/datepicker.utils';

import { RangePickerProps, RangePickerStates } from '../interfaces/rangepicker.interfaces'
import { DateTimePickerOutPut, defaultConfigs } from '../interfaces/datetimepicker.interfaces';
import { getHeaderFieldColors, getActivePillColors } from '../styles/rangepicker.colors'

import styles from "../styles/rangepicker.css";


export default class RangePicker extends React.Component<RangePickerProps, RangePickerStates> {

	constructor(props:RangePickerProps) {
		super(props);

		let otherDateRangeIndex = 0;
		if(props.showRangeTrace) {
			const date_obj = getInputDate(props.to_date)
			otherDateRangeIndex = createRangeIndex(date_obj.day, date_obj.month)
		}

		this.state = {
			// from date is selected as default
			is_to_date : false,
			// which advance pill is selected
			advance_pill : null,
			otherDateRangeIndex,
		}
	}

	static defaultProps = {
		from_date : defaultConfigs.date,
		to_date : defaultConfigs.date,
		weekStartsOn : defaultConfigs.weekStartsOn,
		format : defaultConfigs.format,
		closeButtonText: 'Close',
		showRangeTrace: true,
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

	handleToDateSelect = () => {
		const {showRangeTrace, from_date} = this.props

		let otherDateRangeIndex = 0;
		if(showRangeTrace) {
			const date_obj = getInputDate(from_date)
			otherDateRangeIndex = createRangeIndex(date_obj.day, date_obj.month)
		}
		this.setState({is_to_date: true, otherDateRangeIndex})
	}

	handleFromDateSelect = () => {
		const {showRangeTrace, to_date} = this.props

		let otherDateRangeIndex = 0;
		if(showRangeTrace) {
			const date_obj = getInputDate(to_date)
			otherDateRangeIndex = createRangeIndex(date_obj.day, date_obj.month)
		}
		this.setState({is_to_date: false, otherDateRangeIndex})
	}

	render = () => {
		const {is_to_date, advance_pill, otherDateRangeIndex} = this.state
		const {format, timeFormat, dateFormat, weekStartsOn,
			from_date, onFromTimeUpdate, onFromDateUpdate,
			to_date, onToTimeUpdate, onToDateUpdate,
			onDone, colors, closeButtonText,
			showRangeTrace,
		} = this.props

		const commonProps = {format, timeFormat, dateFormat, weekStartsOn,
			showRangeTrace, otherDateRangeIndex}

		const from_date_str = getInitialDateForInput(from_date, format)
		const to_date_str = getInitialDateForInput(to_date, format)

		return (
			<div className={styles.wrapper} style={{color: colors.primary_font_color}}>
				<div className={styles.table_wrapper} style={{background: colors.primary_color}}>

					<div className={styles.header} style={{ background: colors.secondary_highlight_color }}>
						<div className={styles.header_div} 
							onClick={this.handleFromDateSelect} >

							<div className={styles.header_label} style={{ color: colors.primary_color }}>From</div>
							<div className={[
								styles.header_field_abs
							].join(' ')}
								style={getHeaderFieldColors(colors, !is_to_date)}>
								{from_date_str}
							</div>

						</div>

						<div className={styles.header_div}
							onClick={this.handleToDateSelect} 
						>
							<div className={styles.header_label} style={{ color: colors.primary_color }}>To</div>
							<div className={[
								styles.header_field_abs
							].join(' ')}
								style={getHeaderFieldColors(colors, is_to_date)}>
								{to_date_str}
							</div>
						</div>

						{Boolean(onDone) &&
							<div className={styles.done_btn}
								style={{ color: colors.primary_color }}
								onClick={onDone}>
								{closeButtonText}
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
								onDateTimeUpdate={this.handleDateTimeUpdate} {...commonProps} />
							:
								// from date first
							<UnwrappedDateTimePicker date={from_date} colors={colors}
								onTimeUpdate={onFromTimeUpdate} onDateUpdate={onFromDateUpdate}
								onDateTimeUpdate={this.handleDateTimeUpdate} {...commonProps} />
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
		const { is_to_date } = this.state

		const from_ts = startOfToday()
		const to_ts = endOfToday()
		
		// call related handlers
		const fromDateObj = getInputDate(from_ts)
		onFromDateTimeUpdate(generateOutPut(fromDateObj, format))
		const toDateObj = getInputDate(to_ts)
		onToDateTimeUpdate(generateOutPut(toDateObj, format))
		
		let otherDateRangeIndex = is_to_date ?
			createRangeIndex(fromDateObj.day, fromDateObj.month) : createRangeIndex(toDateObj.day, toDateObj.month)
		this.setState({advance_pill: 't', otherDateRangeIndex})
	}

	handleYesterday = () => {
		const {format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const { is_to_date } = this.state

		const from_ts = startOfYesterday()
		const to_ts = endOfYesterday()
		// call related handlers
		const fromDateObj = getInputDate(from_ts)
		onFromDateTimeUpdate(generateOutPut(fromDateObj, format))
		const toDateObj = getInputDate(to_ts)
		onToDateTimeUpdate(generateOutPut(toDateObj, format))

		let otherDateRangeIndex = is_to_date ?
			createRangeIndex(fromDateObj.day, fromDateObj.month) : createRangeIndex(toDateObj.day, toDateObj.month)
		this.setState({advance_pill: 'y', otherDateRangeIndex})
	}
	
	handleLastMonth = () => {
		const {format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const { is_to_date } = this.state
		const now = new Date()


		let from_ts = startOfMonth(now)
		from_ts = subMonths(from_ts, 1)
		let to_ts = endOfMonth(now)
		to_ts = subMonths(to_ts, 1)

		// call related handlers
		const fromDateObj = getInputDate(from_ts)
		onFromDateTimeUpdate(generateOutPut(fromDateObj, format))
		const toDateObj = getInputDate(to_ts)
		onToDateTimeUpdate(generateOutPut(toDateObj, format))

		let otherDateRangeIndex = is_to_date ?
			createRangeIndex(fromDateObj.day, fromDateObj.month) : createRangeIndex(toDateObj.day, toDateObj.month)
		this.setState({advance_pill: 'lm', otherDateRangeIndex})

	}

	handleThisMonth = () => {
		const {format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const { is_to_date } = this.state
		const now = new Date()

		const from_ts = startOfMonth(now)
		const to_ts = endOfMonth(now)

		// call related handlers
		const fromDateObj = getInputDate(from_ts)
		onFromDateTimeUpdate(generateOutPut(fromDateObj, format))
		const toDateObj = getInputDate(to_ts)
		onToDateTimeUpdate(generateOutPut(toDateObj, format))

		let otherDateRangeIndex = is_to_date ?
			createRangeIndex(fromDateObj.day, fromDateObj.month) : createRangeIndex(toDateObj.day, toDateObj.month)
		this.setState({advance_pill: 'tm', otherDateRangeIndex})
	}

	handleThisWeek = () => {
		const {weekStartsOn, format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const { is_to_date } = this.state
		const now = new Date()

		// @ts-ignore
		const from_ts = startOfWeek(now, {weekStartsOn})
		// @ts-ignore
		const to_ts = endOfWeek(now, {weekStartsOn})
		// call related handlers
		const fromDateObj = getInputDate(from_ts)
		onFromDateTimeUpdate(generateOutPut(fromDateObj, format))
		const toDateObj = getInputDate(to_ts)
		onToDateTimeUpdate(generateOutPut(toDateObj, format))

		let otherDateRangeIndex = is_to_date ?
			createRangeIndex(fromDateObj.day, fromDateObj.month) : createRangeIndex(toDateObj.day, toDateObj.month)
		this.setState({advance_pill: 'tw', otherDateRangeIndex})
	}

	handleLastWeek = () => {
		const {weekStartsOn, format,
			onFromDateTimeUpdate, onToDateTimeUpdate} = this.props
		const { is_to_date } = this.state

		const now = new Date()
		// @ts-ignore
		let from_ts = startOfWeek(now, {weekStartsOn})
		from_ts = subWeeks(from_ts, 1)
		// @ts-ignore
		let to_ts = endOfWeek(now, {weekStartsOn})
		to_ts = subWeeks(to_ts, 1)
		// call related handlers
		const fromDateObj = getInputDate(from_ts)
		onFromDateTimeUpdate(generateOutPut(fromDateObj, format))
		const toDateObj = getInputDate(to_ts)
		onToDateTimeUpdate(generateOutPut(toDateObj, format))

		let otherDateRangeIndex = is_to_date ?
			createRangeIndex(fromDateObj.day, fromDateObj.month) : createRangeIndex(toDateObj.day, toDateObj.month)
		this.setState({advance_pill: 'lw', otherDateRangeIndex})
	}
}