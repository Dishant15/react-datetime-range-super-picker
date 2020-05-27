import { format } from "date-fns";

import { formatDate, _type_safe_isValidDate } from "../datepicker/utils";
import { createInputTime, generateTimeOutput } from "../timepicker/utils";

import { 
	DateTimePickerProps, 
	MainDateTimeObject, 
	// DateTimePickerOutPut
} from "./interfaces";
import { defaultConfigs, OutputTime } from "../timepicker/interfaces";
import { DatePickerOutPut } from "../datepicker/interfaces";

export const getInputDate = (
	date_time_input: DateTimePickerProps["date"]
): MainDateTimeObject => {
	if(_type_safe_isValidDate(date_time_input)) {
		const time_str = format(date_time_input, defaultConfigs.format)
		const time_obj = createInputTime(time_str)
		return {
			day : date_time_input.getDate(),
			month : date_time_input.getMonth(),
			year : date_time_input.getFullYear(),
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
):any => { // DateTimePickerOutPut
	let result, formatted;

	if(date) {
		// date object given
		const new_time_json = generateTimeOutput({...curr_date}, defaultConfigs.format)
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
	}

	return {
		date : result,
		formatted
	}
}