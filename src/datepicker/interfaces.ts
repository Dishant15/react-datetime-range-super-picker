export interface MainDate {
	day : number,
	month : number,
	year : number,
}

export interface DatePickerOutPut extends MainDate {
	date : Date,
	formatted : string
}

export interface DatePickerProps {
	/** default value : new Date() ; i.e. current time  */
	date? : Date | MainDate,
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