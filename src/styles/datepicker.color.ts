import { ComponentTheme, InlineCssStyles } from '../interfaces/style.interfaces';

export const getCalenderCellColors = (
	colors:ComponentTheme, is_active:boolean
) : InlineCssStyles => {
	if(is_active) {
		return {
			background: colors.secondary_highlight_color,
			color: colors.primary_color,
			'--calender-cell-hover-color': colors.primary_color,
			'--calender-cell-hover-bg-color': colors.secondary_highlight_color,
		}
	} else {
		return {
			color: colors.secondary_highlight_color,
			'--calender-cell-hover-color': colors.primary_color,
			'--calender-cell-hover-bg-color': colors.secondary_highlight_color,
		}
	}
}

export const getWrapperStyles = (colors: ComponentTheme) => ({
	background: colors.primary_color,
	color: colors.primary_font_color
})