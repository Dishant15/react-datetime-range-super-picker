import { startOfMonth, startOfWeek, isValid,
	endOfMonth, addDays, format as date_format } from "date-fns";
import {chunk, get} from 'lodash'

import { DayListShape, DatePickerOutPut, MainDate } from "./interfaces";


const _type_safe_isValidDate = (time:any):time is Date => {
	return isValid(time)
}

export const formatDate = (date:Date | MainDate) => {
	if(_type_safe_isValidDate(date)) {
		return {day : date.getDate(), month : date.getMonth(), year : date.getFullYear()}
	} else {
		const now = new Date()
		return {
			day : get(date , 'day', now.getDate() ), 
			month : get(date , 'month', now.getMonth() ), 
			year : get(date , 'year', now.getFullYear() )
		}
	}
	
}

const _WEEK_MAPPER = {
	0 : 'S',
	1 : 'M',
	2 : 'T',
	3 : 'W',
	4 : 'T',
	5 : 'F',
	6 : 'S'
}

/**
 * 0 based circular array with given length that has inc and desc func
 * 
 * @param {Number} value current value that needs to increment
 * @param {Number} length Length of the entire circular array
 */
export function incrementCircularData(value:number, length:number) {
    return (value + 1) % length
}

export const getWeekList = (weekStartsOn=0):string[] => {
	let res_week_list = []
	let curr_pointer = weekStartsOn
	for (let index = 0; index < 7; index++) {
		res_week_list.push(_WEEK_MAPPER[curr_pointer])
		curr_pointer = incrementCircularData(curr_pointer, 7)
	}
	return res_week_list
}

export const getDayList = (day:number, month:number, year:number, weekStartsOn:any = 0) : DayListShape[][] => {
	const curr_date = new Date(year, month, day)
	// start month date
	const sm_date = startOfMonth(curr_date)
	const sw_date = startOfWeek(sm_date, {weekStartsOn})
	const em_date = endOfMonth(curr_date)

	const sm_day = sm_date.getDate()
	const em_day = em_date.getDate()
	// get month days in list
	let res_list = []
	for(let index = sm_day; index <= em_day; index++) {
		res_list.push({
			day : index, 
			curr_month : true, 
			id : `${index}-${month}`
		})
	}
	// get padding week days of previous month
	let start_delta = sm_date.getDay() - weekStartsOn
	// for week start day greater than current day
	if(start_delta < 0) start_delta = 7 + start_delta

	const sw_day = sw_date.getDate()
	const sw_month = sw_date.getMonth()
	for(let index = start_delta - 1; index >= 0; index--) {
		const this_day = sw_day + index
		// add at the front
		res_list.unshift({
			day : this_day, 
			curr_month : false,
			id : `${this_day}-${sw_month}`
		})
	}

	// calculate last padding
	const chunked_res_list = chunk(res_list, 7)
	const last_week_ind = (chunked_res_list.length - 1)
	const end_delta = 7 - chunked_res_list[last_week_ind].length

	// get next month
	const next_month = addDays(em_date, 1).getMonth()
	for(let index = 1; index <= end_delta; index++) {
		chunked_res_list[last_week_ind].push({
			day : index, 
			curr_month : false,
			id : `${index}-${next_month}`
		})
	}

	return chunked_res_list
}


export const generateDatePickerOutput = (
	day:number, month:number, year:number, 
	format:string) : DatePickerOutPut => {
		
	let date = new Date(year, month, day)
	const formatted = date_format(date, format)

	if(date.getDate() !== day) {
		// reset day as this month don't have that day
		day = 1
		date = new Date(year, month, day)
	}

	return {date, formatted, day, month, year}
}