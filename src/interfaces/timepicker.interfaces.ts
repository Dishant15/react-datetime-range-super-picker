import { ComponentTheme } from './style.interfaces';

export interface TimeObject { 
	/** default value : 8 */
	hour? :number | string, 
	/** default value : undefined */
	hour24? :number | string, 
	/** default value : 0 */
	minute?:number | string, 
	/** default value : AM */
	meridiem? : string
}

export interface TimePickerProps {
	/** string fromat = "HH:mm" ( 24 hrs ) | "hh:mm aa" ( 12 hrs ) */
	/** default value : 08:00 AM */
	time : undefined | string | TimeObject,
	/** default value : hh:mm aaa */
	format? : string
	// styling props
	colors : ComponentTheme
	// handler props
	onTimeUpdate : (time:OutputTime) => void
	onDone? : () => void
}

/**
 * Time object used internally for render and updates
 */
export interface MainTime {
	hour : number | undefined, // 12 hours format
	minute : number | undefined,
	// AM | PM
	meridiem : string
}

export interface OutputTime {
	formatted : string,
	time : {
		/** default value : 8 */
		hour :number | undefined, 
		/** default value : undefined */
		hour24 :number | undefined, 
		/** default value : 0 */
		minute :number | undefined, 
		/** default value : AM */
		meridiem : string
	}
}

export const defaultConfigs = {
	format : 'hh:mm aaa'
}

export interface TimeTitleWrapperProps extends MainTime {
	time_format : string,
	colors: ComponentTheme,
	onTimeUpdate : ({}:MainTime) => void,
}

export interface ClockFaceProps extends MainTime {
	onTimeUpdate : ({}:MainTime) => void,
	colors: ComponentTheme
}

export interface TimePickerInputProps extends TimePickerProps {
	inputStyle? : React.CSSProperties,
	popupStyle? : React.CSSProperties,
	className? : string,
	popupClassName? : string,
	isDisabled?: boolean,
	inputComponent?: React.ReactElement,
}