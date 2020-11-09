import { ComponentTheme, InlineCssStyles } from '../interfaces/style.interfaces';

export const getCalenderCellColors = (
	colors:ComponentTheme, isActive:boolean, isHover:boolean
) : InlineCssStyles => {
	if(isActive && isHover) {
		return {
			'border-bottom-color': colors.secondary_highlight_color,
			'border-bottom-style': 'solid',
			'border-bottom-width': '1px',
			'border-top-color': colors.secondary_highlight_color,
			'border-top-style': 'solid',
			'border-top-width': '1px',
			color: colors.secondary_highlight_color,
			'--calender-cell-hover-color': colors.primary_color,
			'--calender-cell-hover-bg-color': colors.secondary_highlight_color,
		}
	}
	else if(isActive) {
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