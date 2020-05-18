export interface TimeObject { 
	/** default value : 8 */
	hour? :number | string, 
	/** default value : undefined */
	hour24? :number | string, 
	/** default value : 0 */
	minute:number | string, 
	/** default value : AM */
	meridiem? : string
}

export interface TimePickerProps {
	/** string fromat = "HH:mm" ( 24 hrs ) | "hh:mm aa" ( 12 hrs ) */
	/** default value : 08:00 AM */
	time : undefined | string | TimeObject,
	/** default value : hh:mm aaa */
	format? : string
	onTimeUpdate : (time:OutputTime) => void
	onDone : () => void
}

/**
 * Time object used internally for render and updates
 */
export interface MainTime {
	hour : number, // 12 hours format
	minute : number,
	meridiem : string
}

export interface OutputTime {
	formatted : string,
	time : TimeObject
}