import { get } from "lodash";

import { _type_safe_isValidDate } from "./datepicker.utils";
import { OutputShape } from "../interfaces/monthpicker.interfaces";

export const formatMonth = (month:number, str_format:string = 'MMM'):string => {
	const monthSummery = [
		{M: "1", Mo: "1st", MM: "01", MMM: "Jan", MMMM: "January", MMMMM: "J"},
		{M: "2", Mo: "2nd", MM: "02", MMM: "Feb", MMMM: "February", MMMMM: "F"},
		{M: "3", Mo: "3rd", MM: "03", MMM: "Mar", MMMM: "March", MMMMM: "M"},
		{M: "4", Mo: "4th", MM: "04", MMM: "Apr", MMMM: "April", MMMMM: "A"},
		{M: "5", Mo: "5th", MM: "05", MMM: "May", MMMM: "May", MMMMM: "M"},		
		{M: "6", Mo: "6th", MM: "06", MMM: "Jun", MMMM: "June", MMMMM: "J"},		
		{M: "7", Mo: "7th", MM: "07", MMM: "Jul", MMMM: "July", MMMMM: "J"},		
		{M: "8", Mo: "8th", MM: "08", MMM: "Aug", MMMM: "August", MMMMM: "A"},		
		{M: "9", Mo: "9th", MM: "09", MMM: "Sep", MMMM: "September", MMMMM: "S"},		
		{M: "10", Mo: "10th", MM: "10", MMM: "Oct", MMMM: "October", MMMMM: "O"},		
		{M: "11", Mo: "11th", MM: "11", MMM: "Nov", MMMM: "November", MMMMM: "N"},		
		{M: "12", Mo: "12th", MM: "12", MMM: "Dec", MMMM: "December", MMMMM: "D"},		
	]
	return monthSummery[month][str_format]
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