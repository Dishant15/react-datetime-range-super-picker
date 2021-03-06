import { ComponentTheme } from './style.interfaces';

export interface OutputShape {
	// 0 -> 11, 0 = Jan; 11 = Dec
	month : number,
	year : number
}

export interface MonthPickerProps {
	/** default value : new Date() ; i.e. current time  */
	time?: OutputShape | Date,
	colors: ComponentTheme
	onDateUpdate: ({}:OutputShape) => void
}