import { format, isValid } from "date-fns";

import { OutputShape } from "./interfaces";

export const formatMonth = (month:number, str_format:string = 'MMM'):string => {
	const now = new Date()
	now.setMonth(month)
	return format(now, str_format)
}

const _type_safe_isValidDate = (time:any):time is Date => {
	return isValid(time)
}

export const getMonthAndYear = (time:OutputShape | Date): OutputShape => {

	if(_type_safe_isValidDate(time)) {
		// time is a date object
		return {month: time.getMonth(), year: time.getFullYear()}
	} else {
		// time is a month object
		return time
	}
}