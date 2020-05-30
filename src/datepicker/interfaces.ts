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
	date_id : string
}

export interface DatePickerProps {
	/** default value : new Date() ; i.e. current time  */
	date : Date | MainDate,
	/** default value : 0, Sunday */
	weekStartsOn : number,
	/** default value : 'dd/MM/YYY' */
	format : string
	onDateUpdate : ({}:DatePickerOutPut) => void,
	onComplete? : () => void
}

export interface DayListShape {
	day : number,
	curr_month : boolean,
	// id : day-month
	id : string
}

export interface DatePickerInputProps extends DatePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string
}

export const defaultConfigs = {
	date : new Date(),
	format : 'do MMMM yyyy',
	weekStartsOn : 0
}