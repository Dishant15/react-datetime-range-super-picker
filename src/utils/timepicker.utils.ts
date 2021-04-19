import { isObject, isString, isUndefined, isNull, trim, upperCase } from "lodash";
import { format } from "date-fns";


import { TimePickerProps, MainTime, OutputTime } from "../interfaces/timepicker.interfaces";


export const createInputTime = (input_time : TimePickerProps["time"]):MainTime => {
	// default values
	let res_hour, res_minute, res_meridiem = 'AM';
    

	if(isObject(input_time)) {
		const {hour, hour24, minute, meridiem} = input_time
		if( (isUndefined(hour) || isNull(hour)) &&
		(isUndefined(hour24) || isNull(hour24)) ){
			res_meridiem = meridiem ? meridiem : res_meridiem
		}
		// input has hour | hour24
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
		if(input_time.includes("M") || input_time.includes("m")) {
			// 12 hrs format
			const [hhmm, meridiem] = trim(input_time).split(" ")
			const [hour, minute] = trim(hhmm).split(":")

			res_hour = Number(hour) === 0 ? 12 : Number(hour)
			res_minute = Number(minute)
			if(!!meridiem) {
				// meridiem can be a.m. | AM | am | a; result must be AM / PM
				// remove all space and '.'
				res_meridiem = meridiem.replace(/[^a-zA-Z]/g, "")
				// all to capital , A | AM
				res_meridiem = upperCase(res_meridiem)
				// handle single A case
				res_meridiem = res_meridiem.includes("A") ? "AM" : "PM"
			}
		}
		else {
			// 24 hrs format
			const [hour24, minute] = trim(input_time).split(":")
			// handle incorrect string; where hour24 is undefined | null | NaN
            if(hour24) {
				const modulo = Number(hour24) % 12
				res_hour = modulo === 0 ? 12 : modulo
				res_minute = Number(minute)
				res_meridiem = Number(hour24) >= 12 ? 'PM' : 'AM'
			}
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
	if(!hour) {
		return {formatted: '', time: {hour, hour24, minute, meridiem}}
	} 
	if(meridiem === 'PM') {
		// 12 PM is 12 hrs
		hour24 = (hour === 12) ? 12 : hour + 12
	} 
	else {
		// 12 AM is 00 hrs
		if(hour === 12) hour24 = 0
	}
	let time = {hour, minute, meridiem, hour24}

	let formatted:string
	try {
		// create time formatted string
		let now = new Date()
		// @ts-ignore
		now.setHours(hour24)
		// @ts-ignore -- format bellow will raise err if this is wrong
		now.setMinutes(minute)
		formatted = format(now, time_format)
	} catch (error) {
		formatted = ''
	}

	return {
		formatted,
		time
	}
}