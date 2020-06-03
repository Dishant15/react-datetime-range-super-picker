import { TimeObject, OutputTime, MainTime } from "../timepicker/interfaces";
import { MainDate, DatePickerOutPut } from "../datepicker/interfaces";

export interface DateObject extends TimeObject, MainDate {
	// { day, month, year, hour? , hour24?, minute?, meridem?}
}

export interface DateTimePickerProps {
	date : Date | DateObject | string,
	// optional props
	/** default value : 'dd/MM/YYY hh:mm aaa' */
	format : string,
	timeFormat : string,
	dateFormat : string,
	weekStartsOn : number,

	onDateTimeUpdate : ({}:DateTimePickerOutPut) => void,
	onTimeUpdate? : (time:OutputTime) => void,
	onDateUpdate? : ({}:DatePickerOutPut) => void,
}

export interface MainDateTimeObject extends MainDate, MainTime {

}

export interface OutPutDateTime extends MainDate {
	// { day, month, year, hour , hour24, minute, meridem }
	date : Date,
	/** default value : 8 */
	hour :number, 
	/** default value : undefined */
	hour24 :number, 
	/** default value : 0 */
	minute :number, 
	/** default value : AM */
	meridiem : string
}

export interface DateTimePickerOutPut {
	date : OutPutDateTime,
	formatted: string
}


export interface DateTimePickerInputProps extends DateTimePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string
}

export const defaultConfigs = {
	date : new Date(),
	format : 'do MMMM yyyy, hh:mm aaa',
	weekStartsOn : 0
}