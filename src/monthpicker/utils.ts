import { format } from "date-fns";
import { get } from "lodash";

import { _type_safe_isValidDate } from "../utils/datepicker.utils";
import { OutputShape } from "./interfaces";

export const formatMonth = (month:number, str_format:string = 'MMM'):string => {
	const now = new Date()
	now.setMonth(month)
	return format(now, str_format)
}

export const getMonthAndYear = (time:OutputShape | Date): OutputShape => {

	if(_type_safe_isValidDate(time)) {
		// time is a date object
		return {month: time.getMonth(), year: time.getFullYear()}
	} else {
		// time is a month object
		const now = new Date()
		return {
			month : get(time , 'month', now.getMonth() ), 
			year : get(time , 'year', now.getFullYear() )
		}
	}
}