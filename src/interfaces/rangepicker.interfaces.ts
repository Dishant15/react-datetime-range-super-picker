import { OutputTime } from "./timepicker.interfaces";
import { DatePickerOutPut } from "./datepicker.interfaces";
import { DateTimePickerOutPut, DateObject } from "./datetimepicker.interfaces";
import { ComponentTheme } from "../utils/style.utils";


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

	onFromDateTimeUpdate : ({}:DateTimePickerOutPut) => void,
	onFromTimeUpdate? : (time:OutputTime) => void,
	onFromDateUpdate? : ({}:DatePickerOutPut) => void,

	onToDateTimeUpdate : ({}:DateTimePickerOutPut) => void,
	onToTimeUpdate? : (time:OutputTime) => void,
	onToDateUpdate? : ({}:DatePickerOutPut) => void,

	onDone? : () => void
}

export interface OutPutRangePicker {

}

export interface RangePickerInputProps extends RangePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string
}