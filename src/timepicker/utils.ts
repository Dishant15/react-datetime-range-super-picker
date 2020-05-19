import { isObject, isString, isUndefined, trim } from "lodash";
import { format } from "date-fns";


import { TimePickerProps, MainTime, OutputTime } from "./interfaces";


export const createInputTime = (input_time : TimePickerProps["time"]):MainTime => {
	// default values
	let res_hour = 8, res_minute = 0, res_meridiem = 'AM';

	if(isObject(input_time)) {
		const {hour, hour24, minute, meridiem} = input_time
		if(isUndefined(hour) && isUndefined(hour24)) {
			// keep hour as it is
			res_minute = Number(minute)
			res_meridiem = meridiem ? meridiem : res_meridiem
		}
		else if(isUndefined(hour)) {
			// 24 hour format given
			const modulo = Number(hour24) % 12
			res_hour = modulo === 0 ? 12 : modulo
			res_minute = Number(minute)
			res_meridiem = Number(hour24) >= 12 ? 'PM' : 'AM'
		}
		else {
			// 12 hour format given
			res_hour = Number(hour) === 0 ? 12 : Number(hour)
			res_minute = Number(minute)
			res_meridiem = meridiem ? meridiem : res_meridiem
		}
	} else if (isString(input_time)) {
		if(input_time.includes("m")) {
			// 12 hrs format
			const [hhmm, meridiem] = trim(input_time).split(" ")
			const [hour, minute] = trim(hhmm).split(":")

			res_hour = Number(hour) === 0 ? 12 : Number(hour)
			res_minute = Number(minute)
			res_meridiem = meridiem ? meridiem : res_meridiem
		}
		else {
			// 24 hrs format
			const [hour24, minute] = trim(input_time).split(":")
			const modulo = Number(hour24) % 12
			res_hour = modulo === 0 ? 12 : modulo
			res_minute = Number(minute)
			res_meridiem = Number(hour24) >= 12 ? 'PM' : 'AM'
		}
	}

	return {
		hour : res_hour, minute : res_minute, meridiem : res_meridiem
	}
}

export const generateTimeOutput = (
	{hour, minute, meridiem} : MainTime, 
	time_format:string
):OutputTime => {
	
	let hour24 = hour
	// create hour24
	if(meridiem === 'PM') {
		// 12 PM is 12 hrs
		hour24 =(hour === 12) ? 12 : hour + 12
	} else {
		// 12 AM is 00 hrs
		if(hour === 12) hour24 = 0
	}
	let time = {hour, minute, meridiem, hour24}

	// create time formatted string
	let now = new Date()
	now.setHours(hour24)
	now.setMinutes(minute)
	const formatted = format(now, time_format)

	return {
		formatted,
		time
	}
}