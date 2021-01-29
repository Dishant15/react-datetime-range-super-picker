import { OutputTime } from "./timepicker.interfaces";
import { DatePickerOutPut, MainDate } from "./datepicker.interfaces";
import { DateTimePickerOutPut, DateObject } from "./datetimepicker.interfaces";
import { ComponentTheme } from './style.interfaces';


/*************************************
 * Date Time Range Picker Interfaces *
 *************************************/

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
	showRangeTrace: boolean,

	onFromDateTimeUpdate : ({}:DateTimePickerOutPut) => void,
	onFromTimeUpdate? : (time:OutputTime) => void,
	onFromDateUpdate? : ({}:DatePickerOutPut) => void,

	onToDateTimeUpdate : ({}:DateTimePickerOutPut) => void,
	onToTimeUpdate? : (time:OutputTime) => void,
	onToDateUpdate? : ({}:DatePickerOutPut) => void,

	onDone? : () => void
}

export interface RangePickerStates {
	is_to_date: boolean,
	// required only for DateRangePicker to show range trace on single calendar
	// will not be there for RangePicker
	traceStatus?: string,
	advance_pill: string | null,
	otherDateRangeIndex: number,
}

export interface OutPutRangePicker {

}

export interface RangePickerInputProps extends RangePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string,
	isDisabled?: boolean
}

/********************************
 * Date Range Picker Interfaces *
 ********************************/

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
	showRangeTrace: boolean,

	// if input is DateTime output than make sure to reset time values
	onFromDateUpdate : ({}:DateTimePickerOutPut | DatePickerOutPut) => void,
	onToDateUpdate : ({}:DateTimePickerOutPut | DatePickerOutPut) => void,

	onDone? : () => void
}

export interface DateRangePickerInputProps extends DateRangePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string,
	isDisabled?: boolean
}

export interface DateRangePickerStates {
	is_to_date: boolean,
	advance_pill: string | null,
}