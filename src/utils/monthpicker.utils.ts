import { get } from "lodash";

import { _type_safe_isValidDate } from "./datepicker.utils";
import { OutputShape } from "../interfaces/monthpicker.interfaces";

const MONTH_SUMMERY = {
	0 : {M: "1", Mo: "1st", MM: "01", MMM: "Jan", MMMM: "January", MMMMM: "J"},
	1 :	{M: "2", Mo: "2nd", MM: "02", MMM: "Feb", MMMM: "February", MMMMM: "F"},
	2 :	{M: "3", Mo: "3rd", MM: "03", MMM: "Mar", MMMM: "March", MMMMM: "M"},
	3 :	{M: "4", Mo: "4th", MM: "04", MMM: "Apr", MMMM: "April", MMMMM: "A"},
	4 :	{M: "5", Mo: "5th", MM: "05", MMM: "May", MMMM: "May", MMMMM: "M"},
	5 :	{M: "6", Mo: "6th", MM: "06", MMM: "Jun", MMMM: "June", MMMMM: "J"},
	6 :	{M: "7", Mo: "7th", MM: "07", MMM: "Jul", MMMM: "July", MMMMM: "J"},
	7 :	{M: "8", Mo: "8th", MM: "08", MMM: "Aug", MMMM: "August", MMMMM: "A"},
	8 :	{M: "9", Mo: "9th", MM: "09", MMM: "Sep", MMMM: "September", MMMMM: "S"},
	9 :	{M: "10", Mo: "10th", MM: "10", MMM: "Oct", MMMM: "October", MMMMM: "O"},
	10 : {M: "11", Mo: "11th", MM: "11", MMM: "Nov", MMMM: "November", MMMMM: "N"},
	11 : {M: "12", Mo: "12th", MM: "12", MMM: "Dec", MMMM: "December", MMMMM: "D"},
}

export const formatMonth = (month:number, str_format:string = 'MMM'):string => {
	return MONTH_SUMMERY[month][str_format]
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