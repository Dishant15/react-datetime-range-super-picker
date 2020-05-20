export interface OutputShape {
	// 0 -> 11, 0 = Jan; 11 = Dec
	month : number,
	year : number
}

export interface MonthPickerProps extends OutputShape {
	/** default value : new Date() ; i.e. current time  */
	time? : OutputShape | Date,
	onTimeUpdate : ({}:OutputShape) => void
}