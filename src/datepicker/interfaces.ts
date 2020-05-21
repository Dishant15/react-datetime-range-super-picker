export interface DatePickerOutPut {
	date : Date,
	formatted : string
}

export interface DatePickerProps {
	/** default value : new Date() ; i.e. current time  */
	date? : Date,
	/** default value : 0, Sunday */
	weekStartsOn : number,
	format? : string
	onDateUpdate : ({}:DatePickerOutPut) => void
}

export interface DayListShape {
	day : number,
	curr_month : boolean,
	// id : day-month
	id : string
}