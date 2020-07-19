import { CSSProperties } from "react"

export type ComponentThemeOptional = {
	primary_color?: string,
	primary_font_color?: string,
	light_font_color?: string,
	
	secondary_color?: string,

	primary_highlight_color?: string,
	secondary_highlight_color?: string,
}

export type ComponentTheme = {
	primary_color: string,
	/**
	 * Used location of primary_color
	 * 	- TimePicker
	 *		- in wrapper, main background
	 *		- active MM & hover font color
	 *		- active HH & hover font color
	 *		- meridiem block background while inactive
	 *		- meridiem active, hover font color
	 * 	- MonthPicker
	 *		- in wrapper, main background
	 *		- year set btn font color while hover
	 * 	- DatePicker
	 *		- in wrapper, main background
	 *		- calender cell active & hover font color
	 * 	- DateTimePicker
	 *		- in wrapper, main background
	 * 	- RangePicker
	 *		- in wrapper, main background
	 *		- from, to label color
	 *		- active from / to background color
	 *		- inactive from / to font color
	 *		- side month / week selection active and hover font color
	 */
	primary_font_color: string,
	/**
	 * Used location of primary_font_color
	 * 	 - TimePicker
	 * 		- in wrapper, main font color 
	 * 			which effect all inactive HH, MM font color
	 * 		- inactive meridiem font color
	 *	- MonthPicker
	 *		- in wrapper, main font color but not effect anything
	 * 		- right carousal arrow color
	 * 	- DatePicker
	 * 		- in wrapper, main font color but not effect anything
	 * 	- DateTimePicker
	 * 		- in wrapper, main font color but not effect anything
	 * 	- RangePicker
	 * 		- in wrapper, main font color but not effect anything
	 */
	light_font_color: string,
	/**
	 * Used location of light_font_color
	 *   - MonthPicker
	 * 		- left carousal arrow color
 	 * 		- month pill inactive font color
	 */
	secondary_color: string,
	/**
	 * Used location of secondary_color
	 *  - TimePicker
	 * 		- clock face background color
	 *	- MonthPicker
	 *		- month pill background color
	 *	- DateTimePicker
	 *		- right border color
	 */
	primary_highlight_color: string,
	/**
	 * Used location of primary_highlight_color
	 * 	- TimePicker
	 * 		- time title color
	 * 		- minute hand color
	 * 		- active minute pill background color
	 * 	- MonthPicker
	 * 		- title color
	 * 		- active month pill font color
	 *	- DatePicker
	 *		- week day title
	 *	- DateTimePickerInput
	 *		- done arrow color
	 *	- RangePicker
	 *		- done arrow color
	 */
	secondary_highlight_color: string,
	/**
	 * Used location of secondary_highlight_color
	 * 	- TimePicker
	 * 		- hour hand color
	 * 		- active hour pill background color
	 * 		- active and hover meridiem background color
	 * 	- MonthPicker
	 * 		- inactive set btn font color
	 * 		- hover set btn background color
	 *	- DatePicker
	 *		- active calender cell background color
	 * 		- inactive calender cell font color
	 * 	- RangePicker
	 * 		- header background color
	 * 		- side advance column background color
	 */
}

export type InlineCssStyles = CSSProperties | { [key: string]: string }