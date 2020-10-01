import { ComponentTheme } from './style.interfaces';

export interface MainDate {
	day : number,
	month : number,
	year : number,
}

export interface DatePickerOutPut extends MainDate {
	date : Date,
	formatted : string
}

export interface DatePickerState extends MainDate {
	date_id : string,
	dateRangeIndex: number,
	// hover states
	hoverOn: boolean,
	hoverRangeIndex: number,
}

export interface DatePickerProps {
	/** default value : new Date() ; i.e. current time  */
	date : Date | MainDate | string,
	/** default value : 0, Sunday */
	weekStartsOn : number,
	/** default value : 'dd/MM/YYY' */
	format : string,
	colors: ComponentTheme,
	onDateUpdate : ({}:DatePickerOutPut) => void,
	onComplete? : () => void,
	// internal props
	/** created with func datepicker.utils => createRangeIndex */
	otherDateRangeIndex: number,
	showRangeTrace: boolean,
}

export interface DayListShape {
	day : number,
	rangeIndex: number,
	// is this current month or not
	curr_month : boolean,
	// id : day-month
	id : string
}

export interface DatePickerInputProps extends DatePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string,
	isDisabled?: boolean
}

export const defaultConfigs = {
	date : new Date(),
	format : 'do MMMM yyyy',
	weekStartsOn : 0
}