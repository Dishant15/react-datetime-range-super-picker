import { format, parse } from "date-fns";
import { isString } from "lodash";

import { formatDate, _type_safe_isValidDate } from "../datepicker/utils";
import { createInputTime, generateTimeOutput } from "../timepicker/utils";

import { 
	DateTimePickerProps, 
	MainDateTimeObject, 
	DateTimePickerOutPut,
	DateObject,
	defaultConfigs
} from "./interfaces";
import { defaultConfigs as timeDefaultConfig, OutputTime } from "../timepicker/interfaces";
import { DatePickerOutPut } from "../datepicker/interfaces";

export const getInputDate = (
	date_time_input: DateTimePickerProps["date"], dt_format=defaultConfigs.format
): MainDateTimeObject => {
	if(_type_safe_isValidDate(date_time_input)) {
		const time_str = format(date_time_input, timeDefaultConfig.format)
		const time_obj = createInputTime(time_str)
		return {
			day : date_time_input.getDate(),
			month : date_time_input.getMonth(),
			year : date_time_input.getFullYear(),
			...time_obj
		}
	} else if (isString(date_time_input)) {
		const ip_date = parse(date_time_input, dt_format, new Date())
		const time_str = format(ip_date, timeDefaultConfig.format)
		const time_obj = createInputTime(time_str)
		return {
			day : ip_date.getDate(),
			month : ip_date.getMonth(),
			year : ip_date.getFullYear(),
			...time_obj
		}
	}

	let date_output = formatDate(date_time_input)
	const time_output = createInputTime(date_time_input)

	return {...date_output, ...time_output}
}



export const generateOutPut = (
	curr_date:MainDateTimeObject, date_format:string,
	date? : DatePickerOutPut, time? : OutputTime, 
):DateTimePickerOutPut => { // DateTimePickerOutPut
	let result, formatted;

	if(date) {
		// date object given; passed from calender component
		const new_time_json = generateTimeOutput({...curr_date}, timeDefaultConfig.format)
		const current_date_obj = new Date(
			date.year, date.month, date.day,
			new_time_json.time.hour24, new_time_json.time.minute
		)
		formatted = format(current_date_obj, date_format)

		result = {
			date : current_date_obj,
			day : date.day, month: date.month, year: date.year,
			...new_time_json.time
		}
	} else if(time) {
		// time given; passed from clock component
		const current_date_obj = new Date(
			curr_date.year, curr_date.month, curr_date.day,
			time.time.hour24, time.time.minute
		)
		formatted = format(current_date_obj, date_format)

		result = {
			day : curr_date.day, month: curr_date.month, year: curr_date.year,
			date : current_date_obj,
			...time.time
		}
	} else {
		// only current date given
		const new_time_json = generateTimeOutput({...curr_date}, timeDefaultConfig.format)
		const current_date_obj = new Date(
			curr_date.year, curr_date.month, curr_date.day,
			new_time_json.time.hour24, new_time_json.time.minute
		)
		formatted = format(current_date_obj, date_format)

		result = {
			date : current_date_obj,
			day : curr_date.day, month: curr_date.month, year: curr_date.year,
			...new_time_json.time
		}
	}

	return {
		date : result,
		formatted
	}
}


export const getInitialDateForInput = (
	date:Date | DateObject | string , format:string=defaultConfigs.format
): string => {
	const curr_date = getInputDate(date, format)
	return generateOutPut(curr_date, format).formatted
}