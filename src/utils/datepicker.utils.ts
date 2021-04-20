import { startOfMonth, startOfWeek, isValid,
	endOfMonth, addDays, format as date_format, parse, parseISO } from "date-fns";
import {chunk, get, isString, isNaN} from 'lodash'

import { DayListShape, DatePickerOutPut, MainDate,
	defaultConfigs } from "../interfaces/datepicker.interfaces";


export const _type_safe_isValidDate = (time:any):time is Date => {
	return isValid(parseISO(time))
}

export const _is_number = (num: number | undefined | null): num is number => {
	// check if num is number ( even 0 ); return false only if its undefined / null
	return !isNaN(Number(num))
}

export const formatDate = (date:Date | MainDate | string | undefined, format=defaultConfigs.format) => {
	if(_type_safe_isValidDate(date)) {
		return {day : date.getDate(), month : date.getMonth(), year : date.getFullYear()}

	} else if (isString(date)) {
		const ip_date = parse(date, format, new Date())
		if(!_type_safe_isValidDate(ip_date)) {
			console.log('Warning : You have passed invalid date in props !')
			const now = new Date()
			return {day : now.getDate(), month : now.getMonth(), year : now.getFullYear()}
		}
		return {day : ip_date.getDate(), month : ip_date.getMonth(), year : ip_date.getFullYear()}
	} else {
		// if(date.day < 0 || date.day > 31) {
		// 	throw `invalid date : ${date.day}`
		// }
		const now = defaultConfigs.date
		let ip_obj = {
			day : get(date , 'day'), 
			month : get(date , 'month', now.getMonth() ), 
			year : get(date , 'year', now.getFullYear() )
		}
		// validate if date is correct else reset day
		// if day is 31 feb or something else
		if(_is_number(ip_obj.day)) {
			const test_date = new Date(ip_obj.year, ip_obj.month, ip_obj.day)
			if(test_date.getMonth() !== ip_obj.month) {
				ip_obj.day = 1
			}
		}
		return ip_obj
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

export const getWeekList = (weekStartsOn=defaultConfigs.weekStartsOn):string[] => {
	let res_week_list = []
	let curr_pointer = weekStartsOn
	for (let index = 0; index < 7; index++) {
		res_week_list.push(_WEEK_MAPPER[curr_pointer])
		curr_pointer = incrementCircularData(curr_pointer, 7)
	}
	return res_week_list
}

export const createRangeIndex = (day:number | undefined, month:number, year:number):number | undefined => {
	if(_is_number(day)) return (year*10000) + (month*100) + day;
	return undefined
}

export const parseRangeIndex = (rangeIndex:number):number[] => {
	const day = rangeIndex % 100
	const m_y_temp = Math.round(rangeIndex/100)
	const month = m_y_temp % 100
	const year = Math.round(m_y_temp / 100)

	return [ day, month, year]
}

export const getDayList = (
	day:number | undefined, month:number, year:number, weekStartsOn:any = defaultConfigs.weekStartsOn
) : DayListShape[][] => {
	const curr_date = !!(day) ? new Date(year, month, day) : new Date(year, month)
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
			rangeIndex: createRangeIndex(index, month, year),
			curr_month : true, 
		})
	}
	// get padding week days of previous month
	let start_delta = sm_date.getDay() - weekStartsOn
	// for week start day greater than current day
	if(start_delta < 0) start_delta = 7 + start_delta

	const sw_day = sw_date.getDate()
	const sw_month = sw_date.getMonth()
	const sw_year = sw_date.getFullYear()
	for(let index = start_delta - 1; index >= 0; index--) {
		const this_day = sw_day + index
		// add at the front
		res_list.unshift({
			day : this_day, 
			rangeIndex: createRangeIndex(this_day, sw_month, sw_year),
			curr_month : false,
		})
	}

	// calculate last padding
	const chunked_res_list = chunk(res_list, 7)
	const last_week_ind = (chunked_res_list.length - 1)
	const end_delta = 7 - chunked_res_list[last_week_ind].length

	const next_month_first_day = addDays(em_date, 1)
	// get next month
	const next_month = next_month_first_day.getMonth()
	// year may change for next month
	const next_year = next_month_first_day.getFullYear()
	for(let index = 1; index <= end_delta; index++) {
		chunked_res_list[last_week_ind].push({
			day : index, 
			rangeIndex: createRangeIndex(index, next_month, next_year),
			curr_month : false,
		})
	}
	// @ts-ignore; rangeIndex will not be null for any createRangeIndex here
	return chunked_res_list
}


export const generateDatePickerOutput = (
	day:number | undefined, month:number, year:number, 
	format:string) : DatePickerOutPut => {
	
	let date;
	let formatted = ''
	if(!isNaN(Number(day))) {
		date = new Date(year, month, day)
		formatted = date_format(date, format)

		if(date.getDate() !== day) {
			// reset day as this month don't have that day
			day = 1
			date = new Date(year, month, day)
		}
	}

	return {date, formatted, day, month, year}
}

export const getInitialDateForInput = (
	date : Date | MainDate | string | undefined, format : string=defaultConfigs.format
):string => {
	if(!date) return ''
	const {day, month, year} = formatDate(date, format)
	return generateDatePickerOutput(day, month, year, format).formatted
}