import { OutputTime } from "./timepicker.interfaces";
import { DatePickerOutPut, MainDate } from "./datepicker.interfaces";
import { DateTimePickerOutPut, DateObject } from "./datetimepicker.interfaces";
import { ComponentTheme } from './style.interfaces';
import React from "react";


/*************************************
 * Date Time Range Picker Interfaces *
 *************************************/

// use by :  RangePicker ( date time range picker )
export interface RangePickerProps {
	from_date : Date | DateObject | string,
	to_date : Date | DateObject | string,
	// optional props
	/** default value : 'dd/MM/YYY hh:mm aaa' */
	format : string,
	timeFormat : string,
	dateFormat : string,
	weekStartsOn : number,

	colors: ComponentTheme,

	closeButtonText?: String,

	onFromDateTimeUpdate : ({}:DateTimePickerOutPut) => void,
	onFromTimeUpdate? : (time:OutputTime) => void,
	onFromDateUpdate? : ({}:DatePickerOutPut) => void,

	onToDateTimeUpdate : ({}:DateTimePickerOutPut) => void,
	onToTimeUpdate? : (time:OutputTime) => void,
	onToDateUpdate? : ({}:DatePickerOutPut) => void,

	onDone? : () => void
}

// use by :  RangePickerInput
export interface RangePickerInputProps extends RangePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string,
	isDisabled?: boolean,
	inputComponent?: React.ReactElement,
}

// use by :  RangePicker ( date time range picker )
export interface RangePickerStates {
	is_to_date: boolean,
	advance_pill: string | null,
}

// use by : DateRangePicker
export interface DateRangePickerStates {
	is_to_date: boolean,
	// show range trace on single calendar
	traceStatus?: string,
	advance_pill: string | null,
	otherDateRangeIndex: number,
}

/********************************
 * Date Range Picker Interfaces *
 ********************************/

// use by : DateRangeCalendarPicker, DateRangePicker
export interface DateRangePickerProps {
	/** default value : new Date() ; i.e. current time  */
	from_date : Date | MainDate | string,
	to_date : Date | MainDate | string,
	// optional props
	/** default value : 'dd/MM/YYY' */
	format : string,
	/** default value : 0, Sunday */
	weekStartsOn : number,

	colors: ComponentTheme,

	closeButtonText?: String,

	// if input is DateTime output than make sure to reset time values
	onFromDateUpdate : ({}:DateTimePickerOutPut | DatePickerOutPut) => void,
	onToDateUpdate : ({}:DateTimePickerOutPut | DatePickerOutPut) => void,

	onDone? : () => void
}

// use by : DateRangePickerInput, DateRangeCalendarPickerInput
export interface DateRangePickerInputProps extends DateRangePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string,
	isDisabled?: boolean,
	inputComponent?: React.ReactElement,
}

// use by : DateRangeCalendarPicker
export interface DateRangeCalendarPickerStates {
	is_to_date: boolean,
	advance_pill: string | null,
}